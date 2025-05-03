'use client';
// 导入 React 库中的 useState、useEffect 和 useCallback 钩子
import { useState, useEffect, useCallback } from 'react';
// 导入 Next.js 中的 useRouter 钩子，用于路由导航
import { useRouter } from 'next/navigation';
// 导入 Next.js 中的 Link 组件，用于实现内部链接
import Link from 'next/link';
// 导入自定义的 Button 组件
import { Button } from "@/components/ui/button";
// 导入自定义的 Input 组件
import { Input } from "@/components/ui/input";
// 导入自定义的 Table、TableBody、TableCell、TableHead 和 TableHeader 组件
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
/**
 * AdminPage 是一个 React 组件，用于管理资源。
 * 它使用了 Next.js 的客户端路由，并与 API 进行交互以获取和更新资源。
 * 
 * @returns {JSX.Element} 渲染的 AdminPage 组件。
 */
export default function AdminPage() {
  // 定义状态变量 resources，用于存储资源列表
  const [resources, setResources] = useState([]);
  // 定义状态变量 newResource，用于存储新资源的信息
  const [newResource, setNewResource] = useState({ name: '', description: '', url: '' });
  // 定义状态变量 editingIndex，用于存储当前正在编辑的资源的索引
  const [editingIndex, setEditingIndex] = useState(null);
  // 定义状态变量 isLoading，用于标识是否正在加载资源
  const [isLoading, setIsLoading] = useState(true);
  // 定义状态变量 error，用于存储错误信息
  const [error, setError] = useState(null);
  // 获取路由实例
  const router = useRouter();
  /**
   * 检查用户是否已登录。
   * 如果未登录，则重定向到登录页面。
   */
  const checkAuth = useCallback(async () => {
    try {
      // 发送请求到 /api/check-auth 端点以检查用户是否已登录
      const response = await fetch('/api/check-auth');
      const data = await response.json();
      // 如果用户未登录
      if (!data.isLoggedIn) {
        // 使用 router.push 方法将用户重定向到登录页面
        router.push('/login');
      } else {
        // 如果用户已登录，设置 isLoading 为 false，表示加载完成
        setIsLoading(false);
      }
    } catch (error) {
      // 如果检查认证时发生错误，记录错误并设置 isLoading 为 false
      console.error('Error checking auth:', error);
      setError('Failed to authenticate. Please try again.');
      setIsLoading(false);
    }
  }, [router]);
  /**
   * 当组件挂载时，检查用户认证并获取资源列表。
   */
  useEffect(() => {
    // 调用 checkAuth 函数检查用户认证
    checkAuth();
    // 调用 fetchResources 函数获取资源列表
    fetchResources();
  }, [checkAuth]);
  /**
   * 从 API 获取资源列表。
   */
  const fetchResources = async () => {
    // 设置 isLoading 为 true，表示开始加载资源
    setIsLoading(true);
    // 重置错误状态
    setError(null);
    try {
      // 发送 GET 请求到 /api/resources?source=github 端点以获取资源列表
      const response = await fetch('/api/resources?source=github');
      // 如果响应状态不是 ok
      if (!response.ok) {
        // 抛出错误，表示获取资源失败
        throw new Error('Failed to fetch resources');
      }
      // 解析响应数据为 JSON
      const data = await response.json();
      // 更新 resources 状态为获取到的资源列表
      setResources(data);
    } catch (error) {
      // 如果获取资源时发生错误，记录错误并设置错误状态
      console.error('Error fetching resources:', error);
      setError('Failed to fetch resources. Please try again.');
    } finally {
      // 无论成功或失败，最终都设置 isLoading 为 false，表示加载完成
      setIsLoading(false);
    }
  };
  /**
   * 处理输入框的变化，更新资源或新资源的状态。
   * @param {Object} e - 事件对象。
   * @param {number} [index] - 资源的索引，如果是新资源则为 null。
   */
  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedResources = [...resources];
      updatedResources[index] = { ...updatedResources[index], [name]: value };
      setResources(updatedResources);
    } else {
      setNewResource({ ...newResource, [name]: value });
    }
  };
  /**
   * 设置当前正在编辑的资源的索引。
   * @param {number} index - 要编辑的资源的索引。
   */
  const handleEdit = (index) => {
    setEditingIndex(index);
  };
  /**
   * 保存资源或新资源。
   * @param {number} index - 要保存的资源的索引，如果是新资源则为 -1。
   */
  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) {
      return;
    }
    try {
      const updatedResources = [...resources];
      updatedResources.splice(index, 1);
      
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedResources),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }
      
      await fetchResources();
      setEditingIndex(null);
    } catch (error) {
      console.error('Error deleting resource:', error);
      setError('Failed to delete resource. Please try again.');
    }
  };

  const handleSave = async (index) => {
    let updatedResources = [...resources];
    if (index === -1) {
      updatedResources.push(newResource);
      setNewResource({ name: '', description: '', url: '' });
    }
    try {
      // 发送 POST 请求到 /api/resources 端点以保存资源
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedResources),
      });
      // 如果响应状态不是 ok
      if (!response.ok) {
        // 抛出错误，表示保存资源失败
        throw new Error('Failed to save resources');
      }
      // 保存成功后，重新获取资源列表以更新显示
      await fetchResources();
      // 清除正在编辑的资源索引，表示编辑完成
      setEditingIndex(null);
    } catch (error) {
      // 如果保存资源时发生错误，记录错误并设置错误状态
      console.error('Error saving resources:', error);
      setError('Failed to save resources. Please try again.');
    }
  };
  // 如果正在加载资源，显示加载指示器
  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }
  // 如果发生错误，显示错误消息
  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }
  // 渲染 AdminPage 组件
  return (
    <div className="container mx-auto p-4">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Resource Management</h2>
        
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource, index) => (
            <TableRow key={index}>
              <TableCell>
                {editingIndex === index ? (
                  <Input name="name" value={resource.name} onChange={(e) => handleInputChange(e, index)} />
                ) : (
                  resource.name
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Input name="description" value={resource.description} onChange={(e) => handleInputChange(e, index)} />
                ) : (
                  resource.description
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Input name="url" value={resource.url} onChange={(e) => handleInputChange(e, index)} />
                ) : (
                  resource.url
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {editingIndex === index ? (
                    <>
                      <Button onClick={() => handleSave(index)}>Save</Button>
                      <Button variant="destructive" onClick={() => handleDelete(index)}>Delete</Button>
                    </>
                  ) : (
                    <Button onClick={() => handleEdit(index)}>Edit</Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Input name="name" value={newResource.name} onChange={handleInputChange} placeholder="New resource name" />
            </TableCell>
            <TableCell>
              <Input name="description" value={newResource.description} onChange={handleInputChange} placeholder="New resource description" />
            </TableCell>
            <TableCell>
              <Input name="url" value={newResource.url} onChange={handleInputChange} placeholder="New resource URL" />
            </TableCell>
            <TableCell>
              <Button onClick={() => handleSave(-1)}>Add New</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}