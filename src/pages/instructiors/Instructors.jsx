import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Instructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], isLoading, refetch } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users');
    return res.data;
  });

  const instructors = users.filter(user => user.role === 'instructor');
  if(isLoading){
    return <span className="loading loading-bars loading-lg"></span>;
  }

  return (
    <div className='p-5'>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {instructors.map(instructor => (
          <div key={instructor.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={instructor.photoURL} alt={instructor.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">{instructor.name}</h4>
            <p className="text-gray-600">{instructor.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
