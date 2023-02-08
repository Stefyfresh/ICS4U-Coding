const app = Vue.createApp({
   data() {
      return {
         selectedVariant: 0,
         cart: 0,
         product: 'Socks',
         brand: 'Vue Mastery',
         details: ['50% cotton', '30% wool', '20% polyester'],
         variants: [
            { id: 2234, color: 'Green', image: './assets/images/socks_green.jpg', quantity: 0, onSale: false},
            { id: 2235, color: 'Blue', image: './assets/images/socks_blue.jpg', quantity: 50, onSale: true},
         ]
      };
   },
   methods: {
      addToCart() {
         this.cart += 1;
      },
      updateVariant(index) {
         this.selectedVariant = index;
      }
   },
   computed: {
      title() {
         return this.brand + ' ' + this.product;
      },
      currVariant() {
         return this.variants[this.selectedVariant];
      },
      image() {
         return this.currVariant.image;
      },
      inStock() { // 0 is considered false along with null, undefined, NaN, and ""
         return this.currVariant.quantity > 0;
      },
      desc() {
         return (
            (this.currVariant.quantity > 0) ? 'In Stock' : 'Out of Stock') + 
            ((this.currVariant.onSale && this.inStock) ? " - On Sale!" : ""
         );
      }
   }
});