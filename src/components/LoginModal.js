import { useState } from 'react'; // 导入 React 的 useState 钩子
import { X } from 'lucide-react'; // 导入 Lucide React 图标库中的 X 图标

/**
 * 登录模态框组件。
 * @param {boolean} isOpen - 模态框是否打开。
 * @param {function} onClose - 关闭模态框的回调函数。
 * @param {function} onLogin - 登录成功的回调函数。
 * @returns {JSX.Element} - 渲染的登录模态框组件。
 */
export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [password, setPassword] = useState(''); // 管理密码状态的 useState 钩子
  const [error, setError] = useState(''); // 管理错误消息状态的 useState 钩子

  /**
   * 处理表单提交事件。
   * @param {Event} e - 表单提交事件对象。
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止表单默认提交行为
    setError(''); // 清空错误消息
    try {
      // 发送 POST 请求到 /api/login 接口
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        // 如果响应成功，调用登录成功的回调函数并关闭模态框
        onLogin();
        onClose();
      } else {
        // 如果响应失败，解析并显示错误消息
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      // 如果发生网络错误，记录错误并显示通用错误消息
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  // 如果模态框未打开，返回 null，不渲染任何内容
  if (!isOpen) return null;

  // 渲染登录模态框
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Login</h2>
          {/* 关闭按钮，点击时调用 onClose 函数 */}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {/* 登录表单，提交时调用 handleSubmit 函数 */}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 border rounded mb-4"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}