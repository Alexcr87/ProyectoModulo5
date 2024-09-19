import React from "react";

function Register() {
    return (
        <form action="" className="grid grid-cols-12 gap-4">
            <div className="col-start-1 col-end-13">
                <div className="grid grid-cols-12">
                    <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl" >
                        FORMULARIO DE REGISTRO
                    </div>
                </div>

                <div className="flex ">
                    <div className="flex flex-col ml-[3em] pr-[4em] w-1/2 ">
                        <div className="flex flex-col">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                            />
                        </div>

                        <div className="flex flex-col mt-4">
                            <input
                                id="dni"
                                name="name"
                                type="text"
                                placeholder="Enter your DNI"
                                className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                            />
                        </div>

                        <div className="flex flex-col mt-4">
                            <input
                                name="address"
                                type="text"
                                placeholder="Enter your address"
                                className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                            />
                        </div>

                        <div className="flex flex-col mt-4 ">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                            />
                        </div>

                        <button className="border rounded-full bg-secundaryColor text-black text-left p-2 pl-3 mt-4  focus:border-tertiaryColor shadow-lg relative">
                            School
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 border-t-4 border-x-4 border-transparent border-t-black">
                                {" "}
                            </span>
                        </button>

                        <button className="border rounded-full bg-secundaryColor text-black text-left p-2 pl-3 mt-4  focus:border-tertiaryColor shadow-xl relative">
                            Rol
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 border-t-4 border-x-4 border-transparent border-t-black">
                                {" "}
                            </span>
                        </button>

                        <div className="flex items-center mt-4">
                            <input
                                id="candidate"
                                type="checkbox"
                                className="h-5 w-5 appearance-none border-2 border-sebg-secundaryColor rounded-sm shadow-lg flex items-center justify-center 
                 checked:after:content-['✔'] checked:after:text-sebg-secundaryColor checked:after:block checked:after:font-bold checked:after:items-center checked:after:justify-center"
                            />
                            <label htmlFor="candidate" className="ml-2 text-black">
                                Candidate
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col  mr-[3em]  pl-[4em] w-1/2 ">
                        <button className="border rounded-full bg-secundaryColor text-black text-left p-2 pl-3 mt-1  focus:border-tertiaryColor shadow-xl relative">
                            Nomination
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 border-t-4 border-x-4 border-transparent border-t-black">
                                {" "}
                            </span>
                        </button>
                        <button className="border rounded-full bg-secundaryColor text-black text-left p-2 pl-3 mt-4  focus:border-tertiaryColor shadow-xl relative">
                            Work Team
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 border-t-4 border-x-4 border-transparent border-t-black">
                                {" "}
                            </span>
                        </button>
                        <button className="border rounded-full h-10 bg-tertiaryColor text-white m-10 ">
                            Register
                        </button>
                        <img
                            src="/images/registerImage.png"
                            alt="Small icon"
                            className="w-52 mx-auto"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;
