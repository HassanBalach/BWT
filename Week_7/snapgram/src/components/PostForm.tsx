import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import FileUploader from "./Shared/FileUploader"
import { PostFormProps } from "@/Types"
import { PostValidation } from "@/lib/validation"
import { useUserContext } from "@/context/AuthContext"
import { useCreatePostMutation, useUpdatePost } from "@/lib/react-query/qreries"
import { toast } from "./ui/use-toast"
import { useNavigate } from "react-router-dom"
import Loading from "./Shared/Loading"


const PostForm = ({ post, action }: PostFormProps) => {
    // 🤍Need to come Need to come back here for action in props🔅
    const { user } = useUserContext();
    const navigate = useNavigate()


    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePostMutation();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post?.location : "",
            tags: post ? post?.tags.join(",") : "",
        },
    })


    // 2. Define a submit handler.
    const handlePostSubmition = async (values: z.infer<typeof PostValidation>) => {
        let updateSuccessful = false;
    
        if (post && action === "Update") {
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post.imageId,
                imageUrl: post.imageUrl,
            });
    
            if (updatedPost) {
                updateSuccessful = true;
                navigate(`/posts/${post.$id}`);
                toast({
                    title: `Post updated successfully.`,
                });
                return;
            }
        }
    
        if (!updateSuccessful) {
            // If it's not an update, create a new post
            const newPost = await createPost({
                ...values,
                userId: user.id,
            });
    
            if (newPost) {
                navigate(`/`);
                toast({
                    title: `Post created successfully.`,
                });
            } else {
                toast({
                    title: `Post submission failed. Please try again.`,
                });
            }
        }
    };
    

    return (

        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handlePostSubmition)}
                className="flex flex-col gap-9 w-full  max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>

                            <FormMessage className="shad-form message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photo</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />

                            </FormControl>

                            <FormMessage className="shad-form message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photo</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input " {...field} />

                            </FormControl>

                            <FormMessage className="shad-form message" />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Add Tags (separated by comma " , ")
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Art, Expression, Learn"
                                    className="shad-input "
                                    {...field}
                                />

                            </FormControl>

                            <FormMessage className="shad-form message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 item-center justify-end ">

                    <Button className="shad-button_dark_4" type="button" >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                        disabled={isLoadingCreate || isLoadingUpdate}>
                        {(isLoadingCreate || isLoadingUpdate) && <Loading />}
                        {action} Post
                    </Button>
                </div>
            </form>
        </Form>

    )
}

export default PostForm

