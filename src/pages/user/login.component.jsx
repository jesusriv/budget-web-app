import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        
        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const submit = async () => {
        const userData = {
            email,
            password
        };

        dispatch(login(userData));
    };

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center bg-dark">
            <div className="w-[320px] p-4 bg-carbon">
                <div className="flex flex-col space-y-3 text-white">
                    <h1 className="text-6xl text-cyan-400 font-extrabold">login</h1>
                    <div className="w-full">
                        <label className="font-bold text-sm">email:</label>
                        <input 
                            className="bg-carbonlight w-full px-4 py-2 rounded-sm text-white font-bold tracking-wide focus:outline focus:outline-3 focus:outline-cyan-200"
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange} />
                    </div>
                    <div className="w-full">
                        <label className="font-bold text-sm">password:</label>
                        <input 
                            className="bg-carbonlight w-full px-4 py-2 rounded-sm text-white font-bold tracking-wide focus:outline focus:outline-3 focus:outline-cyan-200"
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange} />
                    </div>
                    <button onClick={submit} className="px-4 py-2 bg-cyan-400 rounded-sm font-extrabold">
                        log in
                    </button>
                </div>
                <p className="text-white text-center text-sm font-source font-bold mt-3 tracking-wide">
                    Not registered yet? 
                    <Link to="/register" className="text-cyan-400"> Register here</Link>.
                </p>
            </div>

            {/* <div className="w-[320px] flex items-center justify-center my-3">
                <div className="border-1 border-gray-700 w-[130px] h-0"></div>
                <p className="text-gray-400 font-bold px-[10px]">or</p>
                <div className="border-1 border-gray-700 w-[130px] h-0"></div>
            </div>

            <div>
                <button className="w-[320px] px-4 py-2 bg-cyan-400 rounded-sm font-extrabold text-white">
                    view demo
                </button>
            </div> */}
        </div>
    );
};

export default Login;