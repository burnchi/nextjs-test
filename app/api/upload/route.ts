import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// import { promises as fs } from "fs";
import { stat, mkdir, writeFile } from "fs/promises";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = (formData.get("file") as File) || null;
  // 图片二进制
  const buffer = Buffer.from(await file.arrayBuffer());
  const basePath = "./public/uploads";
  const filePath = `${basePath}/${file.name}`;
  // console.log(formData);

  // 检测是否存在uploads文件夹,没有则创建
  try {
    await stat(basePath);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(basePath, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e,
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 },
      );
    }
  }
  // 写入图片
  try {
    // 如果存在文件就不写入
    const isfile = await stat(filePath);
    if (isfile) {
      return NextResponse.json({ error: "图片已经存在" }, { status: 409 });
    }
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // 写入图片
      await writeFile(filePath, buffer);
    } else {
      console.error("已经存在图片");
    }
  }
  revalidatePath("/");
  // 图片信息存入数据库
  return NextResponse.json({ error: "上传成功" }, { status: 200 });
}
