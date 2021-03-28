import request from "./request";


export async function getBlogTypes(){
    return await request.get("/api/blogtype");
}
/**
 * 获取博客列表数据
 */
 export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
  return await request.get("/api/blog", {
    params: {
      page,
      limit,
      categoryid,
    },
  });
}

/**
 * 获取博客分类
 */
export async function getBlogCategories(){
  return await request.get("/api/blogtype")
}


/**
 * 获取博客文章
 */
export async function getBlog(id){
  return await request.get(`/api/blog/${id}`)
} 
