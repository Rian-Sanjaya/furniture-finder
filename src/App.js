import React from 'react';
import DropdownCheckbox from './components/DropdownCheckbox'

class App extends React.Component {
  state = {
    delivery_time: {
      '1 week': false, 
      '2 weeks': false, 
      '1 month': false, 
      'more': false
    },
    furniture_styles: {},
    products: [],
    filters: {
      name: '',
      styles: [],
      times: []
    }
  }

  componentDidMount() {
    this.fetchProducts()
    .then( res => (
      this.setState({
        furniture_styles: res.furniture_styles,
        products: res.products
      })
    ))
  }

  fetchProducts = () => {
    return new Promise( (resolve, reject) => {
      let fetchProducts = {
        furniture_styles: {},
        products: []
      }
  
      fetch('http://www.mocky.io/v2/5c9105cb330000112b649af8')
      .then( res => {
        return res.json()
      })
      .then( res => {
        const furniture_styles = this.setFurnitureStyles(res.furniture_styles)
        const products = res.products
        
        fetchProducts = { furniture_styles, products }
        
        resolve(fetchProducts)
        
      })
      .catch( err => {
        console.err(err)
        reject(err)
      })
    })
  }

  setFurnitureStyles = (styles) => {
    let furniture = {}

    styles.forEach( style => {
      furniture[style] = false  
    })

    return furniture
  }

  handleFilters = (filters) => {

    this.fetchProducts()
    .then( res => {
      // keep current furniture styles state value
      const currentStyles = {...this.state.furniture_styles}

      if (res.furniture_styles && res.furniture_styles.length > 0) {
        res.furniture_styles.forEach( style => {
          if (!currentStyles[style])
            currentStyles[style] = false
        })
      }

      this.setState({
        furniture_styles: currentStyles,
        products: res.products
      }, this.filterProcess)
    })
  }

  filterProcess = () => {
    const name = this.state.filters.name.toLowerCase()
    const styles = this.state.filters.styles
    const times = this.state.filters.times

    let filteredProducts = []
    const newProducts = this.state.products

    let nameProdducts = []
    let styleProducts = []
    let timeProducts = []

    // filter name
    if (name) {
      nameProdducts = newProducts.filter( product => product.name.toLowerCase().includes(name) )
    }
    
    // filter furniture style
    if (styles && styles.length > 0) {
      styles.forEach( style => {
        const sps = newProducts.filter( product => product.furniture_style.includes(style) )

        sps.forEach( sp => {
          if (styleProducts.length === 0) {
            styleProducts.push(sp)
          } 
          else {
            let add = true

            for (let i = 0; i < styleProducts.length; i++) {
              if (sp.name === styleProducts[i].name) {
                add = false
                break
              }
            }

            if (add) 
              styleProducts.push(sp)
          }
        })
      })
    }

    // filter delivery time
    if (times && times.length > 0) {
      times.forEach( time => {
        
        newProducts.forEach( product => {

          const delivery_time = parseInt(product.delivery_time)

          if (time === "1 week") {
            if (delivery_time <= 7) {
              timeProducts.push(product)
            }
          }
          else if (time === "2 weeks") {
            if (delivery_time > 7 && delivery_time <= 14) {
              timeProducts.push(product)
            }
          }
          else if (time === "1 month") {
            if (delivery_time > 14 && delivery_time <= 30) {
              timeProducts.push(product)
            }
          }
          else {
            if (delivery_time > 30) {
              timeProducts.push(product)
            }
          }

        })

      })
    }

    // combine filter
    if (nameProdducts.length > 0) {

      let filtered = []
      let tmpFiltered = [...nameProdducts]

      if (styleProducts.length > 0) {

        styleProducts.forEach( sp => {

          for (let i = 0; i < tmpFiltered.length; i++) {
            if (sp.name === tmpFiltered[i].name) {
              filtered.push(tmpFiltered[i])
              tmpFiltered.splice(i, 1)
              break
            }
          }

        })

        filteredProducts = [...filtered]

      } else {
        filteredProducts = [...tmpFiltered]
      }
      
      if (filteredProducts.length > 0) {
        filtered = []

        tmpFiltered = [...filteredProducts]
  
        if (timeProducts.length > 0) {
  
          timeProducts.forEach( tp => {
  
            for (let i = 0; i < tmpFiltered.length; i++) {
              
              if (tp.name === tmpFiltered[i].name) {
                filtered.push(tmpFiltered[i])
                tmpFiltered.splice(i, 1)
                break
              }
            }
  
          })
  
          filteredProducts = [...filtered]
  
        }  else {
          if (!(times && times.length)) {
            filteredProducts = [...filteredProducts]
          } else {
            filteredProducts = []
          }
        }
      }

    } 
    else if (styleProducts.length > 0) {
      let filtered = []
      let tmpFiltered = [...styleProducts]

      if (timeProducts.length > 0) {

        timeProducts.forEach( tp => {

          for (let i = 0; i < tmpFiltered.length; i++) {
            
            if (tp.name === tmpFiltered[i].name) {
              filtered.push(tmpFiltered[i])
              tmpFiltered.splice(i, 1)
              break
            }
          }

        })

        filteredProducts = [...filtered]

      }  else {
        if (!(times && times.length)) {
          filteredProducts = [...tmpFiltered]
        } else {
          filteredProducts = []
        }
      }

    }
    else if (timeProducts.length > 0) {
      filteredProducts = [...timeProducts]
    }

    if (filteredProducts.length === 0 && !(this.state.filters.name) && this.state.filters.styles.length === 0 && this.state.filters.times.length === 0) {
      filteredProducts = [...newProducts]
    }

    this.setState({
      products: filteredProducts
    })
  }

  handleChange = (e) => {
    const value = e.target.value

    this.setState( prevState => {
      return {
        filters: {
          ...prevState.filters,
          name: value
        }
      }
    }, () => this.handleFilters(this.state.filters))
  }

  handleClickFurniture = (val) => {
    let styles = this.state.filters.styles
    const idx = styles.indexOf(val)

    if (idx === -1) {
      styles.push(val)
    } else {
      styles.splice(idx, 1)
    }
    
    this.setState({
      furniture_styles: {
        ...this.state.furniture_styles,
        [val]: !this.state.furniture_styles[val]
      },
      filters: {
        ...this.state.filters,
        styles
      }
    }, () => this.handleFilters(this.state.filters))
  }

  handleChangeDeliverytime = (val) => {
    let times = this.state.filters.times
    const idx = times.indexOf(val)

    if (idx === -1) 
      times.push(val)
    else
      times.splice(idx, 1)

    this.setState({
      delivery_time: {
        ...this.state.delivery_time,
        [val]: !this.state.delivery_time[val]
      },
      filters: {
        ...this.state.filters,
        times
      }
    }, () => this.handleFilters(this.state.filters))
  }

  render() {
    const MAX_LENGTH = 114
    const { delivery_time, furniture_styles, products, filters: {name} } = this.state

    return (
      <div className="container">

        <div className="header">
          <div className="header-input">
            <input 
              className="header-input-text"
              type='text' 
              name='name'
              val={name}
              onChange={this.handleChange}
              placeholder="Search Furniture" 
            />
          </div>
          
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'inline-block', width: '49%', marginRight: 10, zIndex: 4 }}>
              <DropdownCheckbox 
                backgroundcolor="#fff"
                placeholder="Furniture Style"
                list={Object.keys(furniture_styles)}
                data={furniture_styles}
                onHandleClick={this.handleClickFurniture}
              />
            </div>
              
            <div style={{ display: 'inline-block', width: '49%', zIndex: 3 }}>
              <DropdownCheckbox 
                backgroundcolor="#fff"
                placeholder="Delivery Time"
                list={Object.keys(delivery_time)}
                data={delivery_time}
                onHandleClick={this.handleChangeDeliverytime}
              />
            </div>
          </div>
        </div>
        
        <div className="product-wrapper">
          {
            products.map( (product, i) => {
              return (
                <div 
                  key={product.name} 
                  className="product-box"
                >

                  <div className="product-wrap">
                    <div className="product-name-price">
                      <div className="product-name">
                        {product.name}
                      </div>
                      <div className="product-price">
                        {`IDR ${(product.price).toLocaleString('en')}`}
                      </div>
                    </div>

                    <div className="product-description">
                      {
                        product.description.length > MAX_LENGTH ?
                          `${product.description.substring(0, MAX_LENGTH)}...` 
                        : product.description
                      }
                    </div>

                    <div className="product-style">
                      <span>Furniture Styles</span><br/>
                      <span>{product.furniture_style.join(', ')}</span>
                    </div>

                    <div className="product-delivery">
                      {`Delivery ${product.delivery_time} Days`}
                    </div>
                  </div>

                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
