const Todo = require('../models/Todo');

// Get all todos for a user
exports.getTodos = async (req, res) => {
  try {
    const { status, priority, search, sortBy } = req.query;
    
    let query = { user: req.user.id };

    // Filter by status
    if (status) query.status = status;
    
    // Filter by priority
    if (priority) query.priority = priority;
    
    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let todos = Todo.find(query);

    // Sorting
    if (sortBy) {
      const sortField = sortBy.startsWith('-') ? sortBy.substring(1) : sortBy;
      const sortOrder = sortBy.startsWith('-') ? -1 : 1;
      todos = todos.sort({ [sortField]: sortOrder });
    } else {
      todos = todos.sort({ createdAt: -1 });
    }

    const result = await todos;

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single todo
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Check ownership
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this todo'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create todo
exports.createTodo = async (req, res) => {
  try {
    req.body.user = req.user.id;
    
    const todo = await Todo.create(req.body);

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Check ownership
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this todo'
      });
    }

    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Check ownership
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this todo'
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Toggle todo completion
exports.toggleComplete = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Check ownership
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this todo'
      });
    }

    todo.completed = !todo.completed;
    todo.status = todo.completed ? 'completed' : 'pending';
    todo.completedAt = todo.completed ? Date.now() : null;

    await todo.save();

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
