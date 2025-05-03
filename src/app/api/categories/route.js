import { promises as fs } from 'fs';
import path from 'path';

const categoriesPath = path.join(process.cwd(), 'data', 'json', 'categories.json');

async function readCategories() {
  try {
    const data = await fs.readFile(categoriesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeCategories(categories) {
  await fs.writeFile(categoriesPath, JSON.stringify(categories, null, 2));
}

export async function GET() {
  const categories = await readCategories();
  return new Response(JSON.stringify(categories), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const categories = await readCategories();
  const newCategory = await request.json();
  categories.push(newCategory);
  await writeCategories(categories);
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request) {
  const categories = await readCategories();
  const updatedCategory = await request.json();
  const index = categories.findIndex(c => c.id === updatedCategory.id);
  if (index !== -1) {
    categories[index] = updatedCategory;
    await writeCategories(categories);
  }
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const { id } = await request.json();
  let categories = await readCategories();
  categories = categories.filter(c => c.id !== id);
  await writeCategories(categories);
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}