import jwt from 'jsonwebtoken'; // 导入用于处理 JWT 的库

const JWT_SECRET = process.env.JWT_SECRET; // 从环境变量中获取 JWT 密钥
const DOMAIN = process.env.DOMAIN || 'localhost'; // 从环境变量中获取域名，默认为 localhost

/**
 * 验证 JWT 令牌是否有效。
 * 在开发环境中，允许来自 localhost 或 127.0.0.1 的令牌。
 * 在生产环境中，严格检查令牌的域名是否与配置的域名一致。
 *
 * @param {string} token - 要验证的 JWT 令牌。
 * @returns {boolean} - 如果令牌有效则返回 true，否则返回 false。
 */
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 检查是否处于开发环境
    if (process.env.NODE_ENV === 'development') {
      // 在开发环境中，接受来自 localhost 或 127.0.0.1 的令牌
      return decoded && (decoded.domain === 'localhost' || decoded.domain === '127.0.0.1');
    } else {
      // 在生产环境中，严格检查令牌的域名是否与配置的域名一致
      return decoded && decoded.domain === DOMAIN;
    }
  } catch (error) {
    return false;
  }
}

/**
 * 创建一个新的 JWT 令牌。
 *
 * @returns {string} - 新创建的 JWT 令牌。
 */
export function createToken() {
  return jwt.sign(
    { 
      authenticated: true,
      domain: DOMAIN
    },
    JWT_SECRET,
    { expiresIn: '1h' } // 令牌在 1 小时后过期
  );
}