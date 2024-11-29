import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Edit({
    rolesLabels,
    roles,
    user,
}: {
    roles: any;
    user: User;
    rolesLabels: Record<string, string>;
}) {
    const { data, setData, processing, put, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        roles: user.roles || "",
    });

    const updateUser: FormEventHandler = (ev) => {
        ev.preventDefault();

        put(route("user.update", user.id), {
            preserveScroll: true,
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit {user.name}
                </h2>
            }
        >
            <Head title={`Edit ${user.name}`} />

            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 gap-8">
                    <form onSubmit={updateUser} className="mt-6 space-y-6">
                        <div className="">
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                disabled
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>
                        <div className="">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                disabled
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>
                        <div>
                        <InputLabel htmlFor="roles" value="Assign Role" className="mb-2" />
                            {roles.map((role: any) => (
                                <div
                                    key={role.id}
                                    className="gap-4 flex items-center"
                                >
                                    <Checkbox name="remember" />
                                    <span className="capitalize">
                                        {rolesLabels[role.name]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {/* <div className="">
                            <InputLabel
                                htmlFor="roles"
                                value="Roles"
                            />

                            <TextInput                                
                                id="roles"
                                className="mt-1 block w-full"
                                value={data.roles}
                                onChange={(e) =>
                                    setData("roles", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.roles}
                            />
                        </div> */}
                        <div>
                            <PrimaryButton disabled={processing}>
                                {" "}
                                Update User
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
