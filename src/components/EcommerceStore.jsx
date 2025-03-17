import React, { useState } from 'react';
import { ShoppingCart, Heart, X, ChevronUp, ChevronDown } from 'lucide-react';

const EcommerceStore = () => {
  // بيانات المنتجات
  const [products] = useState([
    { id: 1, name: 'هاتف ذكي', price: 999, image: '/placeholder.jpg', description: 'هاتف ذكي بمواصفات عالية' },
    { id: 2, name: 'حاسوب محمول', price: 1299, image: '/placeholder.jpg', description: 'حاسوب محمول للأعمال والألعاب' },
    { id: 3, name: 'سماعات لاسلكية', price: 199, image: '/placeholder.jpg', description: 'سماعات لاسلكية بجودة صوت ممتازة' },
    { id: 4, name: 'ساعة ذكية', price: 299, image: '/placeholder.jpg', description: 'ساعة ذكية مع ميزات متعددة' },
    { id: 5, name: 'كاميرا رقمية', price: 599, image: '/placeholder.jpg', description: 'كاميرا رقمية بدقة عالية' },
    { id: 6, name: 'سماعة رأس للألعاب', price: 149, image: '/placeholder.jpg', description: 'سماعة رأس للألعاب مع ميكروفون' },
  ]);

  // ملاحظة: قمنا بتغيير مسار الصور من '/api/placeholder/200/200' إلى '/placeholder.jpg'

  // حالة سلة التسوق والمفضلة
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  // حالة عرض السلة والمفضلة
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // إضافة منتج إلى السلة
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  // إزالة منتج من السلة
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  // تغيير كمية المنتج في السلة
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.product.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  // إضافة أو إزالة منتج من المفضلة
  const toggleFavorite = (product) => {
    const isInFavorites = favorites.some(item => item.id === product.id);
    if (isInFavorites) {
      setFavorites(favorites.filter(item => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  // حساب المجموع الكلي للسلة
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <div className="font-sans" dir="rtl">
      {/* شريط التنقل */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">متجر إلكتروني</h1>
          <div className="flex space-x-4">
            <button 
              className="flex items-center space-x-2 ml-4 relative" 
              onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
            >
              <Heart className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            <button 
              className="flex items-center space-x-2 relative" 
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        {/* عرض المنتجات */}
        <h2 className="text-2xl font-bold mb-6">المنتجات المتاحة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-lg font-bold mt-2">{product.price} ريال</p>
                <div className="flex mt-4 space-x-2">
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1 ml-2"
                    onClick={() => addToCart(product)}
                  >
                    إضافة للسلة
                  </button>
                  <button 
                    className={`p-2 rounded ${favorites.some(item => item.id === product.id) ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => toggleFavorite(product)}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* سلة التسوق */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full p-4 overflow-auto">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold">سلة التسوق</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {cart.length === 0 ? (
                <p className="py-8 text-center text-gray-500">سلة التسوق فارغة</p>
              ) : (
                <>
                  <div className="divide-y">
                    {cart.map(item => (
                      <div key={item.product.id} className="py-4 flex">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <p className="text-gray-600">{item.product.price} ريال</p>
                          <div className="flex items-center mt-2">
                            <button 
                              className="bg-gray-200 p-1 rounded"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button 
                              className="bg-gray-200 p-1 rounded"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <button 
                          className="text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>المجموع:</span>
                      <span>{calculateTotal()} ريال</span>
                    </div>
                    <button className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600">
                      إتمام الشراء
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* قائمة المفضلة */}
        {isFavoritesOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full p-4 overflow-auto">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold">المفضلة</h2>
                <button onClick={() => setIsFavoritesOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {favorites.length === 0 ? (
                <p className="py-8 text-center text-gray-500">لا توجد منتجات في المفضلة</p>
              ) : (
                <div className="divide-y">
                  {favorites.map(product => (
                    <div key={product.id} className="py-4 flex">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-gray-600">{product.price} ريال</p>
                        <div className="flex space-x-2 mt-2">
                          <button 
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 ml-2"
                            onClick={() => {
                              addToCart(product);
                              setIsFavoritesOpen(false);
                              setIsCartOpen(true);
                            }}
                          >
                            إضافة للسلة
                          </button>
                          <button 
                            className="text-red-500 text-sm"
                            onClick={() => toggleFavorite(product)}
                          >
                            إزالة
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcommerceStore;