import hashlib
import os

def hash_password(password: str) -> str:
    """Hash a password for storing."""
    salt = os.urandom(32)
    pwd_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return salt.hex() + ':' + pwd_hash.hex()

def verify_password(stored_password: str, provided_password: str) -> bool:
    """Verify a stored password against one provided by user"""
    try:
        salt, pwd_hash = stored_password.split(':')
        return pwd_hash == hashlib.pbkdf2_hmac(
            'sha256', 
            provided_password.encode('utf-8'), 
            bytes.fromhex(salt), 
            100000
        ).hex()
    except ValueError:
        return False
