export type Language = 'ar' | 'fr' | 'en' | 'ber';

export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    men: 'ملابس رجالية',
    women: 'ملابس نسائية',
    children: 'ملابس أطفال',
    settings: 'الإعدادات',
    admin: 'لوحة التحكم',
    
    // Home
    latestProducts: 'أحدث المنتجات',
    viewAll: 'عرض الكل',
    categories: 'الأقسام',
    
    // Product
    price: 'السعر',
    colors: 'الألوان المتوفرة',
    sizes: 'الأحجام المتوفرة',
    orderNow: 'اطلب الآن',
    productDetails: 'تفاصيل المنتج',
    contact: 'اتصل بنا',
    location: 'موقع المحل',
    
    // Order Form
    orderForm: 'نموذج الطلب',
    yourName: 'اسمك',
    yourPhone: 'رقم هاتفك',
    yourAddress: 'عنوانك',
    selectColor: 'اختر اللون',
    selectSize: 'اختر الحجم',
    quantity: 'الكمية',
    submitOrder: 'إرسال الطلب',
    orderSuccess: 'تم إرسال طلبك بنجاح!',
    
    // Settings
    darkMode: 'الوضع الليلي',
    language: 'اللغة',
    
    // Admin
    addProduct: 'إضافة منتج',
    editProduct: 'تعديل المنتج',
    deleteProduct: 'حذف المنتج',
    productName: 'اسم المنتج',
    productDescription: 'وصف المنتج',
    productImages: 'صور المنتج',
    productCategory: 'قسم المنتج',
    save: 'حفظ',
    cancel: 'إلغاء',
    confirmDelete: 'هل أنت متأكد من حذف هذا المنتج؟',
    
    // Footer
    copyright: 'جميع الحقوق محفوظة',
    
    // Common
    loading: 'جاري التحميل...',
    noProducts: 'لا توجد منتجات',
    search: 'بحث',
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    men: 'Vêtements Hommes',
    women: 'Vêtements Femmes',
    children: 'Vêtements Enfants',
    settings: 'Paramètres',
    admin: 'Panneau Admin',
    
    // Home
    latestProducts: 'Derniers Produits',
    viewAll: 'Voir Tout',
    categories: 'Catégories',
    
    // Product
    price: 'Prix',
    colors: 'Couleurs Disponibles',
    sizes: 'Tailles Disponibles',
    orderNow: 'Commander',
    productDetails: 'Détails du Produit',
    contact: 'Nous Contacter',
    location: 'Emplacement du Magasin',
    
    // Order Form
    orderForm: 'Formulaire de Commande',
    yourName: 'Votre Nom',
    yourPhone: 'Votre Téléphone',
    yourAddress: 'Votre Adresse',
    selectColor: 'Choisir la Couleur',
    selectSize: 'Choisir la Taille',
    quantity: 'Quantité',
    submitOrder: 'Envoyer la Commande',
    orderSuccess: 'Votre commande a été envoyée avec succès!',
    
    // Settings
    darkMode: 'Mode Sombre',
    language: 'Langue',
    
    // Admin
    addProduct: 'Ajouter un Produit',
    editProduct: 'Modifier le Produit',
    deleteProduct: 'Supprimer le Produit',
    productName: 'Nom du Produit',
    productDescription: 'Description du Produit',
    productImages: 'Images du Produit',
    productCategory: 'Catégorie du Produit',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce produit?',
    
    // Footer
    copyright: 'Tous droits réservés',
    
    // Common
    loading: 'Chargement...',
    noProducts: 'Aucun produit',
    search: 'Rechercher',
  },
  
  en: {
    // Navigation
    home: 'Home',
    men: 'Men\'s Clothing',
    women: 'Women\'s Clothing',
    children: 'Children\'s Clothing',
    settings: 'Settings',
    admin: 'Admin Panel',
    
    // Home
    latestProducts: 'Latest Products',
    viewAll: 'View All',
    categories: 'Categories',
    
    // Product
    price: 'Price',
    colors: 'Available Colors',
    sizes: 'Available Sizes',
    orderNow: 'Order Now',
    productDetails: 'Product Details',
    contact: 'Contact Us',
    location: 'Store Location',
    
    // Order Form
    orderForm: 'Order Form',
    yourName: 'Your Name',
    yourPhone: 'Your Phone',
    yourAddress: 'Your Address',
    selectColor: 'Select Color',
    selectSize: 'Select Size',
    quantity: 'Quantity',
    submitOrder: 'Submit Order',
    orderSuccess: 'Your order has been sent successfully!',
    
    // Settings
    darkMode: 'Dark Mode',
    language: 'Language',
    
    // Admin
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    deleteProduct: 'Delete Product',
    productName: 'Product Name',
    productDescription: 'Product Description',
    productImages: 'Product Images',
    productCategory: 'Product Category',
    save: 'Save',
    cancel: 'Cancel',
    confirmDelete: 'Are you sure you want to delete this product?',
    
    // Footer
    copyright: 'All rights reserved',
    
    // Common
    loading: 'Loading...',
    noProducts: 'No products',
    search: 'Search',
  },
  
  ber: {
    // Navigation (Tifinagh script)
    home: 'ⴰⵙⵏⵓⴱⴳ',
    men: 'ⵉⵙⵍⵎⴰⵏ ⵏ ⵉⵔⴳⴰⵣⵏ',
    women: 'ⵉⵙⵍⵎⴰⵏ ⵏ ⵜⵎⵖⴰⵔⵉⵏ',
    children: 'ⵉⵙⵍⵎⴰⵏ ⵏ ⵉⵃⵏⵊⵉⵔⵏ',
    settings: 'ⵉⵙⵖⴰⵍⵏ',
    admin: 'ⴰⵙⵉⵔⴰ ⵏ ⵓⵏⴱⴹ',
    
    // Home
    latestProducts: 'ⵉⴼⴰⵔⵙⵏ ⵉⵎⴳⴳⵓⵔⴰ',
    viewAll: 'ⵥⵕ ⴽⵓⵍⵍⵓ',
    categories: 'ⵜⴰⴳⴳⴰⵢⵉⵏ',
    
    // Product
    price: 'ⴰⵙⵡⴰⵎ',
    colors: 'ⵉⵏⵉⵜⵏ ⵉⵍⵍⴰⵏ',
    sizes: 'ⵜⵉⴷⴷⵉ ⵉⵍⵍⴰⵏ',
    orderNow: 'ⴰⵣⵣⵏ ⴷⵖⵉ',
    productDetails: 'ⵉⵙⴰⵍⵏ ⵏ ⵓⴼⴰⵔⵙ',
    contact: 'ⵎⵍⴰⵏ ⴰⵖ',
    location: 'ⴰⴷⵖⴰⵔ ⵏ ⵜⵃⴰⵏⵓⵜ',
    
    // Order Form
    orderForm: 'ⵜⴰⵎⵓⵔⵜ ⵏ ⵓⵣⵣⵏ',
    yourName: 'ⵉⵙⵎ ⵏⵏⴽ',
    yourPhone: 'ⵓⵟⵟⵓⵏ ⵏⵏⴽ',
    yourAddress: 'ⵜⴰⵏⵙⴰ ⵏⵏⴽ',
    selectColor: 'ⵙⵜⵉ ⵉⵏⵉ',
    selectSize: 'ⵙⵜⵉ ⵜⴰⴷⴷⵉ',
    quantity: 'ⵜⴰⵎⵣⵉ',
    submitOrder: 'ⴰⵣⵏ ⴰⵣⵣⵏ',
    orderSuccess: 'ⵉⵜⵜⵡⴰⵣⵏ ⵓⵣⵣⵏ ⵏⵏⴽ!',
    
    // Settings
    darkMode: 'ⴰⵙⴽⴰⵔ ⴰⴱⵔⴽⴰⵏ',
    language: 'ⵜⵓⵜⵍⴰⵢⵜ',
    
    // Admin
    addProduct: 'ⵔⵏⵓ ⴰⴼⴰⵔⵙ',
    editProduct: 'ⵙⵏⴼⵍ ⴰⴼⴰⵔⵙ',
    deleteProduct: 'ⴽⴽⵙ ⴰⴼⴰⵔⵙ',
    productName: 'ⵉⵙⵎ ⵏ ⵓⴼⴰⵔⵙ',
    productDescription: 'ⴰⴳⵍⴰⵎ ⵏ ⵓⴼⴰⵔⵙ',
    productImages: 'ⵜⵉⵡⵍⴰⴼⵉⵏ ⵏ ⵓⴼⴰⵔⵙ',
    productCategory: 'ⵜⴰⴳⴳⴰⵢⵜ ⵏ ⵓⴼⴰⵔⵙ',
    save: 'ⵃⴹⵓ',
    cancel: 'ⵙⵔ',
    confirmDelete: 'ⵉⵙ ⵜⵅⵙⴷ ⴰⴷ ⵜⴽⴽⵙⴷ ⴰⴼⴰⵔⵙ ⴰⴷ?',
    
    // Footer
    copyright: 'ⴰⵣⵔⴼ ⵉⵜⵜⵡⴰⵃⵔⵣ',
    
    // Common
    loading: 'ⴰⵙⵔⴰⴳ...',
    noProducts: 'ⵓⵔ ⵍⵍⵉⵏ ⵉⴼⴰⵔⵙⵏ',
    search: 'ⵔⵣⵓ',
  },
};

export const languageNames: Record<Language, string> = {
  ar: 'العربية',
  fr: 'Français',
  en: 'English',
  ber: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
};

export const isRTL = (lang: Language): boolean => lang === 'ar';
