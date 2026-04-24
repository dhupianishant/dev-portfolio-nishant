import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import { Link } from "react-router-dom";

interface Post {
  title: string;
  slug: { current: string };
  excerpt: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(publishedAt desc){
          title,
          slug,
          excerpt
        }`
      )
      .then(setPosts);
  }, []);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug.current} to={`/blog/${post.slug.current}`}>
            <div className="p-6 border rounded-lg hover:bg-muted transition">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-muted-foreground mt-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;