'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '@/types';
import { isAssignedAdminEmail, PREDEFINED_ADMIN_GMAILS } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  role: Role;
  loginWithGoogle: (customEmail?: string) => User;
  loginWithEmail: (email: string, name?: string) => User;
  registerWithEmail: (name: string, email: string, phone?: string) => User;
  logout: () => void;
  adminGmailList: string[];
}

const defaultUser: User = {
  id: '',
  email: '',
  name: '',
  role: 'CLIENT',
  createdAt: ''
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: 'GUEST',
  loginWithGoogle: () => defaultUser,
  loginWithEmail: () => defaultUser,
  registerWithEmail: () => defaultUser,
  logout: () => {},
  adminGmailList: []
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('kr_user');
    if (savedUser) {
      try {
        const parsed: User = JSON.parse(savedUser);
        const verifiedRole: Role = isAssignedAdminEmail(parsed.email) ? 'ADMIN' : 'CLIENT';
        const updatedUser = { ...parsed, role: verifiedRole };
        setUser(updatedUser);
      } catch {
        // ignore
      }
    }
  }, []);

  const loginWithGoogle = (customEmail?: string): User => {
    const targetEmail = customEmail || 'rusaikmufthi@gmail.com';
    const assignedRole: Role = isAssignedAdminEmail(targetEmail) ? 'ADMIN' : 'CLIENT';

    const googleUser: User = {
      id: `usr-google-${Date.now()}`,
      email: targetEmail,
      name: isAssignedAdminEmail(targetEmail) ? 'KING Realty Principal Admin' : 'Verified Google Client',
      phone: '+94 77 693 7333',
      role: assignedRole,
      createdAt: new Date().toISOString()
    };
    setUser(googleUser);
    localStorage.setItem('kr_user', JSON.stringify(googleUser));
    return googleUser;
  };

  const loginWithEmail = (email: string, name: string = 'User'): User => {
    const assignedRole: Role = isAssignedAdminEmail(email) ? 'ADMIN' : 'CLIENT';

    const emailUser: User = {
      id: `usr-mail-${Date.now()}`,
      email,
      name: isAssignedAdminEmail(email) ? 'KING Realty Principal Admin' : name,
      phone: '+94 77 693 7333',
      role: assignedRole,
      createdAt: new Date().toISOString()
    };
    setUser(emailUser);
    localStorage.setItem('kr_user', JSON.stringify(emailUser));
    return emailUser;
  };

  const registerWithEmail = (name: string, email: string, phone: string = '+94 77 693 7333'): User => {
    const assignedRole: Role = isAssignedAdminEmail(email) ? 'ADMIN' : 'CLIENT';

    const newUser: User = {
      id: `usr-reg-${Date.now()}`,
      email,
      name,
      phone,
      role: assignedRole,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('kr_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kr_user');
  };

  const role: Role = user ? user.role : 'GUEST';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        adminGmailList: PREDEFINED_ADMIN_GMAILS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
