import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

interface Post {
  title: string;
  body: any;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!slug) return;

    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          title,
          body
        }`,
        { slug }
      )
      .then(setPost);
  }, [slug]);

  if (!post) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      <div className="prose prose-invert">
        <PortableText value={post.body} />
      </div>
    </div>
  );
};

export default BlogPost;