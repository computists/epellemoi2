import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:5000/record/");
  if (!response.ok) {
    const message = `An error occurred : ${response.statusText}`;
    window.alert(message);
    return;
  }
  const records = await response.json();
  return records;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newData) => {
    const response = await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    return response.json();
  }
);


export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id) => {
    const response = await fetch(`http://localhost:5000/record/del/${id}`,{method: "DELETE"});
    
    if(!response.ok) {
        const message = `An error occurred : ${response.statusText}`;
        window.alert(message);
        return;
    }
    return id;
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (userWord) => {
    const response = await fetch(`http://localhost:5000/edit/${userWord._id}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(userWord),
    });
    
    console.log(response);

    return userWord;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // addNewPost
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // deletePost
      .addCase(deletePost.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post._id !== action.payload )
        state.error = action.error.message;
      })
      .addCase(editPost.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        let id = action.payload._id;
        state.posts = state.posts.map((post) => {
          return (post._id === id) ? action.payload : post;
        }
        );
        
      });
      
  },
});

export default postsSlice;

export const selectAllPosts = (state) => state.posts;

export const selectPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId);

export const selectPostBy_Id = (state, post_Id) =>
  state.posts.find((post) => post._id === post_Id);
  