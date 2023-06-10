import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthProvider";

const EnrolledClass = () => {
    const { user, loading } = useContext(AuthContext);
    const [enrolledClass, setEnrolledClass] = useState([]);
    const [axiosSecure] = useAxiosSecure();
  
    useEffect(() => {
        const fetchEnrolledClass = async () => {
            try {
                const response = await axiosSecure.get(`/payments/${user?.email}`);
                setEnrolledClass(response.data);
            } catch (error) {
                console.error('Error fetching enrolled class information:', error);
            }
        };
  
        fetchEnrolledClass();
    }, [axiosSecure, user]);
    
    console.log(enrolledClass);
  
    return (
        <div className="ml-[215px]">
            <h1 className="text-2xl font-bold mb-4">Your Enrolled Classes..</h1>
            {enrolledClass.length > 0 ? (
                <div>
                    {enrolledClass.map((enrollment, index) => (
                        <div key={enrollment._id} className="flex border border-gray-800 p-4 mb-4">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold">{enrollment.name}</h2>
                                <p>Email: {enrollment.email}</p>
                                <p>Transaction ID: {enrollment.transationId}</p>
                                <p>Price: ${enrollment.price}</p>
                                <p>Date: {new Date(enrollment.date).toLocaleString()}</p>
                                {/* Render other details */}
                            </div>
                            <img src={enrollment.img} alt="Enrollment Image" className="w-48 h-auto" />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No enrolled classes found.</p>
            )}
        </div>
    );
};

export default EnrolledClass;
