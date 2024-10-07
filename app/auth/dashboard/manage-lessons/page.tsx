// page.tsx
'use client';

import ConsultLesson from '@/app/components/lesson/ConsultLesson';
import CreateLesson from '@/app/components/lesson/CreateLesson';

import { useState } from 'react';

const ManageLessons = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult'>('consult');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lessonId, setLessonId] = useState<number | null>(null); // for UpdateLesson

  return (
    <div className="flex ml-8 items-center justify-center min-h-screen p-4 bg-gray-100">
  <div className="w-full bg-white border-4 border-[#9d31bd] shadow-xl rounded-lg p-6">
    <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Aulas</h1>
    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-4 justify-center">
      <button
        onClick={() => { setAction('consult'); setLessonId(null); }}
        className="p-4 bg-[#9d31bd] transition hover:bg-purple-700 font-semibold text-white rounded w-full sm:w-auto text-lg"
      >
        Consultar Aula
      </button>
      
      <button
        onClick={() => setAction('create')}
        className="mb-2 sm:mb-0 p-4 bg-[#4666AF] transition font-semibold hover:bg-blue-500 text-white rounded w-full sm:w-auto text-lg"
      >
        Criar Aula
      </button>
    </div>

    {action === 'create' && <CreateLesson />}
    {action === 'consult' && <ConsultLesson />}
    
  </div>
</div>

  );
};

export default ManageLessons;
