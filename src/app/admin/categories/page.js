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
  const [errors, setErrors] = useState({ name: false, description: false });
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

  // 新建输入框 onChange
  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: false }));
    setError(null);
  };

  // 编辑行 onChange
  const handleEditInputChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...categories];
    updated[index] = { ...updated[index], [name]: value };
    setCategories(updated);
    setErrors(prev => ({ ...prev, [name]: false }));
    setError(null);
  };

  // 新建保存
  const handleSaveNew = async () => {
    if (!newCategory.name.trim()) {
      setErrors({ name: true, description: false });
      setError('Category name is required for new categories');
      return;
    }
    if (!newCategory.description.trim()) {
      setErrors({ name: false, description: true });
      setError('Category description is required for new categories');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const updatedCategories = [...categories, newCategory];
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategories)
      });
      if (!response.ok) {
        throw new Error('Failed to save categories');
      }
      const savedData = await response.json();
      setCategories(savedData);
      setNewCategory({ name: '', description: '' });
      setErrors({ name: false, description: false });
      setError(null);
      await fetchCategories();
    } catch (error) {
      setError(`Failed to save categories: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  // 编辑保存
  const handleSaveEdit = async (index) => {
    const current = categories[index];
    if (!current.name.trim()) {
      setErrors({ name: true, description: false });
      setError('Category name is required');
      return;
    }
    if (!current.description.trim()) {
      setErrors({ name: false, description: true });
      setError('Category description is required');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categories)
      });
      if (!response.ok) {
        throw new Error('Failed to save categories');
      }
      const savedData = await response.json();
      setCategories(savedData);
      setEditingIndex(null);
      setErrors({ name: false, description: false });
      setError(null);
      await fetchCategories();
    } catch (error) {
      setError(`Failed to save categories: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setErrors({ name: false, description: false });
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setErrors({ name: false, description: false });
    setError(null);
    fetchCategories(); // 还原当前编辑行内容
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategories)
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      setCategories(await response.json());
      setEditingIndex(null);
      setError(null);
      await fetchCategories();
    } catch (error) {
      setError('Failed to delete category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Category Management</h2>
        <Link href="/admin/resources">
          <Button className="text-white bg-black">Resource Management</Button>
        </Link>
      </div>
      {error && <div className="mb-2 text-red-500">{error}</div>}

      {/* 新建区 */}
      <div className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-2">
        <div>
          <Input
            name="name"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={handleNewCategoryChange}
            className={`w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">Category Name is required</p>}
        </div>
        <div>
          <Input
            name="description"
            placeholder="Category Description"
            value={newCategory.description}
            onChange={handleNewCategoryChange}
            className={`w-full ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">Category Description is required</p>}
        </div>
        <Button
          onClick={handleSaveNew}
          className="bg-blue-600 hover:bg-blue-700 text-white w-24"
        >
          新增
        </Button>
      </div>

      {/* 表格区 */}
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Category Name</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Description</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {categories.map((category, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {editingIndex === index ? (
                  <Input
                    name="name"
                    value={category.name}
                    onChange={(e) => handleEditInputChange(e, index)}
                    className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                )}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {editingIndex === index ? (
                  <Input
                    name="description"
                    value={category.description}
                    onChange={(e) => handleEditInputChange(e, index)}
                    className={`w-full ${errors.description ? 'border-red-500' : ''}`}
                  />
                ) : (
                  <div className="text-sm text-gray-500">{category.description}</div>
                )}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex space-x-2">
                  {editingIndex === index ? (
                    <>
                      <Button
                        onClick={() => handleSaveEdit(index)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        保存
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        取消
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(index)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        编辑
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        删除
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}