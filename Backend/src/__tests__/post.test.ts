import { GetPosts } from "../controllers/post";

describe("Post", () => {
  it("Get Post Detail", async () => {
    const [c, r] = await GetPosts({ page: "0" });
    expect(c).toBe(0);
  });
});
