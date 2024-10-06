'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';
import NavbarHeader from './NavbarHeader';
import avatar from '../../../public/images/avatar.png';
import AdminLinks from './AdminLinks';
import ProfessorLinks from './ProfessorLinks';
import StudentLinks from './StudentLinks';

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // Novo estado para controlar a navbar
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cpf');
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
    setIsNavbarOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (sidebarRef.current && !sidebarRef.current.matches(':hover')) {
        setIsSidebarOpen(false);
        setIsNavbarOpen(false);
      }
    }, 200);
  };

  return (
    <>
      {user && (
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-[20rem] text-white bg-[#1D1D1D] shadow-xl z-40 flex flex-col justify-between transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[18rem]'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div>

            <div className="flex justify-center mt-12 mb-8">
              <Image
                src={avatar}
                alt="Imagem Circular"
                width={100}
                height={100}
                className="rounded-full bg-white"
              />
            </div>

            <NavbarHeader />

            <nav className="flex flex-col gap-1 p-2 text-xl font-semibold text-white">
              <Link href="/auth/dashboard" className="flex items-center p-3 rounded-lg hover:bg-[#4666AF]">
                <FaHome className="mr-2" />
                Home
              </Link>

              {user.role === 'ADMIN' && <AdminLinks isNavbarOpen={isNavbarOpen} />}
              {user.role === 'PROFESSOR' && <ProfessorLinks isNavbarOpen={isNavbarOpen} />}
              {user.role === 'STUDENT' && <StudentLinks isNavbarOpen={isNavbarOpen} />}
            </nav>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <Link href="/auth/dashboard/settings" className="flex text-xl font-semibold items-center p-3 rounded-lg hover:bg-[#4666AF]">
              <FaCog className="mr-2" />
              Configurações
            </Link>

            <button onClick={handleLogout} className="flex items-center text-xl font-semibold p-3 rounded-lg hover:bg-[#4666AF]">
              <FaSignOutAlt className="mr-2" />
              Sair
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
