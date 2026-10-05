import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  ShoppingBag,
  ArrowRight,
  ImageIcon,
} from 'lucide-react';
import { Product, Business } from '../../types';

interface ProductManagementViewProps {
  products: Product[];
  business: Business;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onNextStep: () => void;
}

const PRESET_IMAGES = [
  { label: 'Classic Burger', url: '/src/assets/images/burger_classic_1791181550274.jpg' },
  { label: 'Cheese Burger', url: '/src/assets/images/burger_cheese_1791181563016.jpg' },
  { label: 'Chicken Burger', url: '/src/assets/images/burger_chicken_1791181574716.jpg' },
  { label: 'French Fries', url: '/src/assets/images/french_fries_1791181584573.jpg' },
  { label: 'Cold Drink', url: '/src/assets/images/cold_drink_1791181596019.jpg' },
];

export const ProductManagementView: React.FC<ProductManagementViewProps> = ({
  products,
  business,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onNextStep,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('Burgers');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setOriginalPrice('');
    setCategory('Burgers');
    setImage(PRESET_IMAGES[0].url);
    setDescription('');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setPrice(p.price.toString());
    setOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setCategory(p.category);
    setImage(p.image);
    setDescription(p.description);
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Product name is required');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setFormError('Please enter a valid price greater than 0');
      return;
    }

    const numOriginal = originalPrice ? parseFloat(originalPrice) : undefined;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: name.trim(),
        price: numPrice,
        originalPrice: numOriginal,
        category,
        image: image || PRESET_IMAGES[0].url,
        description: description.trim(),
      });
    } else {
      onAddProduct({
        businessId: business.id,
        name: name.trim(),
        price: numPrice,
        originalPrice: numOriginal,
        category,
        image: image || PRESET_IMAGES[0].url,
        description: description.trim(),
        rating: 4.8,
        reviewCount: 1,
        isAvailable: true,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header matching Reference Screen 3 */}
      <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]/60">
        <div>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F7F7F7]">Add Products</h1>
          <p className="text-xs text-[#A8ADBA] mt-0.5">Menu, prices, photos etc.</p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-xs font-bold shadow-md shadow-[#FFC928]/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products list matching Reference Screen 3 */}
      <div className="space-y-3">
        {products.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl border border-[#292E3A]">
            <ShoppingBag className="w-10 h-10 text-[#A8ADBA] mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium text-[#F7F7F7]">No products in your catalog yet.</p>
            <p className="text-xs text-[#A8ADBA] mt-1 mb-4">Add your first menu item to begin taking orders.</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-[#FFC928] text-[#07080C] text-xs font-bold"
            >
              Add First Product
            </button>
          </div>
        ) : (
          products.map(product => (
            <div
              key={product.id}
              className="glass-card p-3 sm:p-4 rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/30 transition-all flex items-center justify-between gap-3 sm:gap-4 group"
            >
              {/* Product Thumbnail */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#151923] shrink-0 border border-[#292E3A]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#F7F7F7] truncate">
                    {product.name}
                  </h3>
                  <span className="text-[10px] text-[#A8ADBA] px-1.5 py-0.5 rounded bg-[#151923] border border-[#292E3A]/60 shrink-0">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono-num font-bold text-sm sm:text-base text-[#FFDF67]">
                    {business.currency}{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono-num text-xs text-[#A8ADBA] line-through">
                      {business.currency}{product.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-[11px] sm:text-xs text-[#A8ADBA] mt-1 line-clamp-1">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons: Edit and Delete */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={() => openEditModal(product)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-[#F7F7F7] bg-[#151923] border border-[#292E3A] hover:border-[#FFC928]/50 hover:text-[#FFDF67] transition-all cursor-pointer flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Edit</span>
                </button>

                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="p-1.5 sm:p-2 rounded-lg text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all cursor-pointer"
                  title="Delete product"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Next Step Button */}
      <div className="pt-4">
        <button
          onClick={onNextStep}
          className="w-full py-3.5 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FFC928]/20 transition-all cursor-pointer"
        >
          <span>Next Step →</span>
        </button>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card-elevated max-w-lg w-full rounded-2xl border border-[#FFC928]/30 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#A8ADBA] hover:text-[#F7F7F7] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display font-bold text-lg text-[#F7F7F7] mb-1">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-[#A8ADBA] mb-5">
              Set title, pricing, category, photo and item details.
            </p>

            {formError && (
              <div className="mb-4 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#F7F7F7] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Classic Burger"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F7F7F7] mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="80"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F7F7F7] mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={e => setOriginalPrice(e.target.value)}
                    placeholder="100"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F7F7F7] mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                >
                  <option value="Burgers">Burgers</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Sides">Sides</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Specials">Specials</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F7F7F7] mb-1.5">
                  Select Product Photo
                </label>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImage(preset.url)}
                      className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer transition-all ${
                        image === preset.url
                          ? 'border-[#FFC928] ring-2 ring-[#FFC928]/30 scale-105'
                          : 'border-[#292E3A] opacity-70 hover:opacity-100'
                      }`}
                      title={preset.label}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      {image === preset.url && (
                        <div className="absolute inset-0 bg-[#FFC928]/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-[#07080C] bg-[#FFC928] rounded-full p-0.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  placeholder="Or enter custom image URL"
                  className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#292E3A] text-[11px] text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F7F7F7] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Fresh veggies, special sauce, crispy and delicious."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#151923] border border-[#292E3A] text-xs text-[#A8ADBA] hover:text-[#F7F7F7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-xs font-bold shadow-md shadow-[#FFC928]/20"
                >
                  {editingProduct ? 'Update Product' : 'Add to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
