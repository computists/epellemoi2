import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { gql, request } from "graphql-request"
import { GRAPHQL_ENDPOINT } from "../realm/constants";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (user) => {
  const getAllRecordsQuery = gql`
  query getAllRecords {
    records(sortBy: CREATEDAT_DESC) {
      _id
      ex
      id
      word
      author
      createdAt
      def
    }
  }
  `;

  const queryVariables = {};
  const headers = { Authorization: `Bearer ${user._accessToken}` }
  
  const response = await request(GRAPHQL_ENDPOINT,
    getAllRecordsQuery,
    queryVariables,
    headers
  );

  return response.records;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (values) => {
    const createRecordQuery = gql`
    mutation AddRecord($data: RecordInsertInput!) {
      insertOneRecord(data: $data) {
        _id
      }
    }
    `;
    const queryVariables = {
      data: values.newData
    };
    const headers = { Authorization: `Bearer ${values.userData._accessToken}` };
    const response = await request(GRAPHQL_ENDPOINT, createRecordQuery, queryVariables, headers);
    console.log(response)
    return;
  }
)











export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (values) => {
    const _id = values.id;
    const user = values.user;
    const deleteRecordQuery = gql`
  mutation DeleteRecord($query: RecordQueryInput!) {
    deleteOneRecord(query: $query) {
      _id
    }
  }
  `;
  const queryVariables = { query: { _id } };
  const headers = { Authorization: `Bearer ${user._accessToken}` };
  const resp = window.confirm("Are you sure you want to delete this word?");
  console.log(_id)
  console.log(user)
  console.log(resp)
    if (!resp) return;

    const response = await request(GRAPHQL_ENDPOINT, deleteRecordQuery, queryVariables, headers);
    console.log(response)
    
  });




  

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (values) => {
    console.log(values)
    const _id = values.word._id;
    const user = values.user;
    const editRecordMutation = gql`
    mutation EditRecord($query: RecordQueryInput!, $set: RecordUpdateInput!) {
      updateOneRecord(query: $query, set: $set) {
        _id
      }
    }
    `;
    const queryAndUpdateVariables = {
      query: {
        _id: values.word._id
      },
      set: {
        ex : values.word.ex,
        id : values.word.id,
        word : values.word.word,
        author : values.word.author,
        createdAt : values.word.createdAt,
        def : values.word.def
      },
    };
    const headers = { Authorization: `Bearer ${user._accessToken}` };
    const response = await request(GRAPHQL_ENDPOINT, editRecordMutation, queryAndUpdateVariables, headers);
    console.log(response)
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    }
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
        //state.posts.push(action.payload);
      })
      // deletePost
      .addCase(deletePost.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editPost.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "succeeded";
      });
      
  },
});

export const selectAllPosts = (state) => state.posts;

export const selectPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId);

export const selectPostBy_Id = (state, post_Id) =>
  state.posts.find((post) => post._id === post_Id);

export const { setStatus } = postsSlice.actions;

export default postsSlice;
