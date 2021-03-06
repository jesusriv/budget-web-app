import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { backgroundColors, icons } from '../../../data/category-data';
import { createCategory } from '../../../features/categories/categoriesSlice';

const CategoryForm = ({ hide, show }) => {
    const [formData, setFormData] = useState({
        name: "",
        icon: "",
        color: ""
    })
    const { name, color, icon } = formData;

    const dispatch = useDispatch();

    const isValidSubmit = category => {
        if (category.name.trim().length > 0 || category.icon.trim().length > 0 || category.color.trim().length > 0) return true;

        return false;
    }

    const changeHandler = (e, name=null, feature=null) => {
        setFormData(prevState => ({
            ...prevState,
            [name || e.target.name]: feature || e.target.value,
        }));
    };

    const submit = async () => {
        if (!name || !color || !icon) {
            toast('Hmm. Some fields seem to be missing');
            return show();
        }
        hide();

        const categoryData = {
            name, 
            color, 
            icon
        };

        if (!isValidSubmit(categoryData)) return null;

        dispatch(createCategory(categoryData));
    }
   
    return (
        <div className='modal'>
            <div className='form-container'>
                <h1 className='form-title'>add category</h1>
                <div className='form'>
                    
                    <div className='w-full'>
                        <label className="form-label">category name:</label>
                        <input 
                            className="form-input"
                            type="text"
                            name="name"
                            placeholder='ex. Phone bill'
                            value={name}
                            onChange={changeHandler} />
                    </div>
                    <div className='w-full'>
                        <label className="form-label">color:</label>
                        <div className='w-full overflow-y-auto bg-carbonlight p-3 rounded
                                    no-scrollbar grid grid-cols-7
                                    gap-2 items-center justify-center'>
                            {backgroundColors.map((c, i) => {
                                const borderColor = c === color ? (
                                    "border-3 border-neutral-100"
                                ) : "";
                                return (
                                    <div key={i} 
                                        name="color"
                                        onClick={e => changeHandler(e, "color", c)}
                                        className={`w-8 h-8 ${c} ${borderColor} rounded-md shrink-0
                                        hover:cursor-pointer shadow-md`}>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='w-full'>
                        <label className='form-label'>icon:</label>
                        <div className='flex overflow-x-auto
                                    space-x-2 px-1 py-2 bg-carbonlight rounded'>
                            {icons.map((ic, i) => {
                                const borderColor = ic === icon ? (
                                    "border-2 border-neutral-400"
                                ) : "";
                                return (
                                    <div key={i} 
                                        name="icon"
                                        className={`text-3xl w-10 h-10
                                    shrink-0 text-white ${borderColor} flex items-center 
                                    justify-center hover:cursor-pointer`} 
                                        onClick={e => changeHandler(e, "icon", ic)}>
                                        <i className={`${ic} mt-1`}></i>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                    
                <div className='form-btn-group'>
                    <button onClick={hide}
                        className='card-btn card-btn-close'>close</button>

                    <button onClick={submit}
                        className='card-btn'>submit</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
