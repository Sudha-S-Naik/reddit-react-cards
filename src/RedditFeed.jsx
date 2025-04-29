import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./components/ui/card";
import { CardContent } from "./components/ui/card";


export default function RedditFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("https://www.reddit.com/r/reactjs.json");
        setPosts(response.data.data.children);
      } catch (error) {
        console.error("Error fetching Reddit posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-cyan-200">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-center text-purple-700">Fetching Reddit posts...</p>
        </div>
      </div>
    );
  }
  
  

  return (
    <div className=" px-5 min-h-screen animate-gradient  bg-gradient-to-r from-blue-100 to-purple-200 ">
      <h1 className="text-4xl font-bold text-center mb-8">r/reactjs Feed</h1>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {posts.map((post) => {
          const { title, selftext_html, url, score } = post.data;
          return (
            <Card key={post.data.id} className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                {selftext_html ? (
                  <div
                    className="text-gray-700 mb-4 text-sm"
                    dangerouslySetInnerHTML={{ __html: decodeHtml(selftext_html) }}
                  />
                ) : (
                  <p className="text-gray-400 italic mb-4">No description provided.</p>
                )}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mb-2 block"
                >
                  Visit Post
                </a>
                <div className="text-gray-600 font-500">Score: {score}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Helper to decode HTML entities
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
