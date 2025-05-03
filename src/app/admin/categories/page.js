'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/check-auth');
      const data = await response.json();
      if (!data.isLoggedIn) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setError('Failed to authenticate. Please try again.');
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
    fetchCategories();
  }, [checkAuth]);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedCategories = [...categories];
      updatedCategories[index] = { ...updatedCategories[index], [name]: value };
      setCategories(updatedCategories);
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    if (!window.confirm('确定要删除这个分类吗？')) {
      return;
    }
    try {
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategories),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      
      await fetchCategories();
      setEditingIndex(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('删除分类失败，请重试。');
    }
  };

  const handleSave = async (index) => {
    let updatedCategories = [...categories];
    if (index === -1) {
      updatedCategories.push(newCategory);
      setNewCategory({ name: '', description: '' });
    }
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategories),
      });
      if (!response.ok) {
        throw new Error('Failed to save categories');
      }
      await fetchCategories();
      setEditingIndex(null);
    } catch (error) {
      console.error('Error saving categories:', error);
      setError('保存分类失败，请重试。');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4">加载中...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">错误: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">分类管理</h2>
        <Link href="/admin/resources">
          <Button variant="outline">资源管理</Button>
        </Link>
      </div>
      
      <div className="mb-4 p-4 border rounded bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{editingIndex === -1 ? '添加新分类' : '编辑分类'}</h3>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <Input
            name="name"
            placeholder="分类名称"
            value={editingIndex === -1 ? newCategory.name : categories[editingIndex]?.name || ''}
            onChange={(e) => handleInputChange(e, editingIndex === -1 ? null : editingIndex)}
          />
          <Input
            name="description"
            placeholder="分类描述"
            value={editingIndex === -1 ? newCategory.description : categories[editingIndex]?.description || ''}
            onChange={(e) => handleInputChange(e, editingIndex === -1 ? null : editingIndex)}
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => handleSave(editingIndex === -1 ? -1 : editingIndex)}>
            {editingIndex === -1 ? '添加' : '保存'}
          </Button>
          {editingIndex !== null && (
            <Button variant="outline" onClick={() => setEditingIndex(null)}>
              取消
            </Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>分类名称</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index}>
              <TableCell>
                {editingIndex === index ? (
                  <Input
                    name="name"
                    value={category.name}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  category.name
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Input
                    name="description"
                    value={category.description}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  category.description
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {editingIndex === index ? (
                    <>
                      <Button onClick={() => handleSave(index)}>保存</Button>
                      <Button variant="outline" onClick={() => setEditingIndex(null)}>取消</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => handleEdit(index)}>编辑</Button>
                      <Button variant="destructive" onClick={() => handleDelete(index)}>删除</Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingIndex === null && (
        <div className="mt-4">
          <Button onClick={() => setEditingIndex(-1)}>添加新分类</Button>
        </div>
      )}
    </div>
  );
}