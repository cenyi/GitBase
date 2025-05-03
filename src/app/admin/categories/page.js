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
    if (index !== null && index >= 0) {
      const updatedCategories = [...categories];
      updatedCategories[index] = { ...updatedCategories[index], [name]: value };
      setCategories(updatedCategories);
    } else {
      setNewCategory(prev => ({
        ...prev,
        [name]: value
      }));
      setEditingIndex(-1); // 强制进入新建模式
    }
    return value;
  };

  // 新增专用方法处理新建逻辑
  const handleAddNew = () => {
    setEditingIndex(-1);
    setNewCategory({ name: '', description: '' });
    setErrors({ name: false, description: false });
    // 立即触发保存操作
    handleSave(-1);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
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
      setError('Failed to delete category. Please try again.');
    }
  };

  const [errors, setErrors] = useState({ name: false, description: false });

  const handleSave = async (index) => {
    const currentName = index === -1 ? newCategory.name : categories[index]?.name || '';
    const currentDesc = index === -1 ? newCategory.description : categories[index]?.description || '';
    
    // 如果是新增操作且字段都为空，则阻止提交
    if (index === -1 && (!currentName.trim() && !currentDesc.trim())) {
      setErrors({ name: true, description: true });
      setError('Please enter at least one field for a new category');
      return;
    } 
    
    // 如果是新增操作且名称为空，则设置错误
    if (index === -1 && !currentName.trim()) {
      setErrors({ ...errors, name: true });
      setError('Category name is required for new categories');
      return;
    }
    
    // 如果是新增操作且描述为空，则设置错误
    if (index === -1 && !currentDesc.trim()) {
      setErrors({ ...errors, description: true });
      setError('Category description is required for new categories');
      return;
    }
    
    // 如果是编辑操作且字段都为空，则阻止提交
    if (index !== -1 && (!currentName.trim() && !currentDesc.trim())) {
      setErrors({ name: true, description: true });
      setError('Please enter at least one field for the category');
      return;
    } 
    
    // 如果是编辑操作且名称为空，则设置错误
    if (index !== -1 && !currentName.trim()) {
      setErrors({ ...errors, name: true });
      setError('Category name is required');
      return;
    }
    
    // 如果是编辑操作且描述为空，则设置错误
    if (index !== -1 && !currentDesc.trim()) {
      setErrors({ ...errors, description: true });
      setError('Category description is required');
      return;
    }
    
    setErrors({ name: false, description: false });
    setError(null);
    
    try {
      // 构造纯数组格式
      const updatedCategories = index === -1 
        ? [...categories, newCategory] // 添加新分类
        : [...categories]; // 创建副本确保状态更新
      
      const response = await fetch('/api/categories', {
        method: 'PUT', // 使用PUT表示替换整个资源
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategories) // 直接序列化数组
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save categories: ${response.status} ${response.statusText}`);
      }
      
      // 使用服务器返回的数据更新状态
      const savedData = await response.json();
      setCategories(savedData);
      
      // 强制刷新数据列表
      await fetchCategories();
      
      setEditingIndex(null);
    } catch (error) {
      console.error('Error saving categories:', error);
      setError(`Failed to save categories: ${error.message}. Please try again.`);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">错误: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Category Management</h2>
        <Link href="/admin/resources">
          <Button className="text-white bg-black">Resource Management</Button>
        </Link>
      </div>
      
    <div className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-2">
        <div className="w-full">
  <Input
    name="name"
    placeholder="Category Name"
    value={editingIndex === -1 ? newCategory.name : categories[editingIndex]?.name || ''}
    onChange={(e) => {
      handleInputChange(e, editingIndex === -1 ? null : editingIndex);
      setErrors({ ...errors, name: false });
    }}
    className={`w-full ${errors.name ? 'border-red-500' : ''}`}
  />
  {errors.name && <p className="text-red-500 text-xs mt-1">Category Name is required</p>}
</div>
<div className="w-full">
  <Input
    name="description"
    placeholder="Category Description"
    value={editingIndex === -1 ? newCategory.description : categories[editingIndex]?.description || ''}
    onChange={(e) => {
      handleInputChange(e, editingIndex === -1 ? null : editingIndex);
      setErrors({ ...errors, description: false });
    }}
    className={`w-full ${errors.description ? 'border-red-500' : ''}`}
  />
  {errors.description && <p className="text-red-500 text-xs mt-1">Category Description is required</p>}
</div>
        <Button 
        onClick={handleAddNew} // 绑定到专用新建方法
        className="bg-blue-600 hover:bg-blue-700 text-white w-24"
        >
        {'Add New'}
        </Button>
    </div>
      
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
                onChange={(e) => handleInputChange(e, index)}
                className="w-full"
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
                onChange={(e) => handleInputChange(e, index)}
                className="w-full"
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
                    onClick={() => handleSave(index)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                    保存
                    </Button>
                    <Button 
                    variant="outline" 
                    onClick={() => setEditingIndex(null)}
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