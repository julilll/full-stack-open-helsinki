const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Bloglist app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "John Smith",
        username: "john",
        password: "smith",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    expect(await page.getByText("username")).toBeVisible();
    expect(await page.getByText("password")).toBeVisible();
    expect(await page.getByText("login")).toBeVisible();
  });

  describe("Login", () => {
    test("login success with proper credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");

      await expect(page.getByText("Matti Luukkainen logged-in")).toBeVisible();
    });

    test("login fails with wrong password", async ({ page }) => {
      await loginWith(page, "mluukkai", "wrong");

      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("Wrong username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(
        page.getByText("Matti Luukkainen logged-in")
      ).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });

    test("A new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Author",
        "www.url.com"
      );
      await expect(
        page.getByText("a blog created by playwright")
      ).toBeVisible();
    });

    test("Likes count can be updated", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Author",
        "www.url.com"
      );
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByText("likes 0")).toBeVisible();
      await page.getByRole("button", { name: "like" }).click();
      await page.getByText("likes 1").waitFor();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("Post can be removed by the same user", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Author",
        "www.url.com"
      );
      await page.getByRole("button", { name: "view" }).click();
      page.on("dialog", async (dialog) => await dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();
      await expect(
        page.getByText("a blog created by playwright")
      ).not.toBeVisible();
    });

    test("Post can't be removed by another user", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Author",
        "www.url.com"
      );
      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, "john", "smith");
      await page.getByRole("button", { name: "view" }).click();
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });

    test("Posts are sorted by likes count", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Author",
        "www.url.com"
      );
      await createBlog(
        page,
        "second blog created by playwright",
        "Author",
        "www.url.com"
      );
      await createBlog(
        page,
        "third blog created by playwright",
        "Author",
        "www.url.com"
      );

      await page.getByRole("button", { name: "view" }).first().click();
      await page.getByRole("button", { name: "view" }).first().click();
      await page.getByRole("button", { name: "view" }).first().click();

      const secondBlog = page.getByTestId("second blog created by playwright");
      const thirdBlog = page.getByTestId("third blog created by playwright");

      await thirdBlog.locator("button").click();
      await thirdBlog.getByText("likes 1").waitFor();
      await thirdBlog.locator("button").click();
      await thirdBlog.getByText("likes 2").waitFor();

      await secondBlog.locator("button").click();
      await secondBlog.getByText("likes 1").waitFor();

      await expect(page.getByTestId("blog").first()).toContainText(
        "third blog created by playwright"
      );
      await expect(page.getByTestId("blog").nth(1)).toContainText(
        "second blog created by playwright"
      );
      await expect(page.getByTestId("blog").nth(2)).toContainText(
        "a blog created by playwright"
      );
    });
  });
});
