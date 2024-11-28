import { Feature } from "@/types";
import { useForm } from "@inertiajs/react";
import TextAreaInput from "./TextAreaInput";
import { FormEventHandler } from "react";
import PrimaryButton from "./PrimaryButton";

export default function NewCommentForm({ feature }: { feature: Feature }) {
    const { data, setData, post, processing, errors } = useForm({
        comment: "",
    });
    const createComment: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("comment.store", feature.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setData("comment", ""),
        });
    };
    return (
        <form
            onSubmit={createComment}
            className="flex items-center gap-2 lg:gap-8 mb-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
        >
            <TextAreaInput
                rows={1}
                value={data.comment}
                onChange={(e) => setData("comment", e.target.value)}
                className="mt-1 w-full block"
                placeholder="Your comment"
            ></TextAreaInput>
            <PrimaryButton disabled={processing}>Comment</PrimaryButton>
        </form>
    );
}
