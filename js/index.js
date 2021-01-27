const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

//Responsive Typography

class fluidTypography {
    constructor(minVW, maxVW, minFontSize, maxFontSize) {
      this.minVW = minVW;
      this.maxVW = maxVW;
      this.minFontSize = minFontSize;
      this.maxFontSize = maxFontSize;
      this.maxRem = this.computeRem().maxRem;
      this.minRem = this.computeRem().minRem;
    }
  
    // Compute the maxRem based on arguments and user's browser preferences
    computeRem() {
      const body = document.documentElement;
      const properties = window.getComputedStyle(body);
      const baseFontSize = properties.fontSize.replace(/px/, '');
      const max = Math.max(this.minFontSize, baseFontSize); // Gets the max font size of either the browser or the dev
      const relativeMax = (this.maxFontSize * max) / this.minFontSize;
      const maxRem = relativeMax / baseFontSize;
      const minRem = max / baseFontSize;
      return { maxRem, minRem };
    }
  
    // Calculate font size based on arguments and user's browser preferences
    fontSize() {
      const width = document.documentElement.offsetWidth;
      let rem = this.minRem;
  
      if (width > this.minVW && width < this.maxVW) {
        rem =
          this.minRem +
          ((this.maxRem - this.minRem) * (width - this.minVW)) /
            (this.maxVW - this.minVW);
      }
  
      if (width > this.maxVW) {
        rem = this.maxRem;
      }
  
      document.documentElement.style = `font-size: ${rem}rem`;
    
  
     // Purely for instructional purposes. Remove for production
      const body = document.body;
      const size = window.getComputedStyle(body);
      fontSizeGauge.innerHTML = `
              <div>
                  <div><p>font-size</p></div>
                  <div class="number ${rem >= this.maxRem || rem <= this.minRem ? 'limit' : 'no-limit'}"><p>${rem}rem or ${size.fontSize}</p></div>
              </div>
              <div>
                  <div><p>viewport width</p></div>
                  <div class="number"><p>${width}px</p></div>
              </div>`;
      //
    }
    
  
    resizeHandler() {
      this.fontSize();
      window.addEventListener("resize", this.fontSize.bind(this));
    }
  }
  
  // Instantiate the class
  const ft = new fluidTypography(320, 1900, 16, 24).resizeHandler();