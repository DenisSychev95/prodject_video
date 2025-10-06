
import "./Search.css";
import React from "react";

class Search extends React.Component {

    state = {
        search: "matrix",
        type: "all",
        page: 1
    }


    hahdleKey = (event) => {
        if (event.key === "Enter") {
            this.props.searchMovie(this.state.search, this.state.type, this.state.page)
        }
    }

    handleFilter = (e) => {
        this.setState(
            () => ({ type: e.target.dataset.type }),
            () => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
        )
    }

    // разобраться как работает
    nextPage = () => {
        this.setState(
            this.props.pages > this.state.page ? { page: this.state.page + 1 } : { page: 1 }
            ,
            () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
        )
    }

    prevPage = () => {
        /* if(this.state.page === 1) */
        this.setState(
            this.state.page > 1 ? { page: this.state.page - 1 } : { page: this.props.pages },
            () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
        )
    }

    clickMe = (num) => {
        this.setState({ page: num },
            () => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
        )

    }

    setPage = (num) => {
        this.setState(
            { page: num },
            () => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
        )
    }


    render() {
        /* let { searchMovie } = this.props */
        let { res, pages } = this.props;

        let minRight = pages - this.state.page;

        let minLeft = this.state.page - 1;

        let toStart = 1;
        let leftOne = this.state.page - 1
        let leftTwo = this.state.page - 2
        let rightOne = this.state.page + 1
        let rightTwo = this.state.page + 2
        let toEnd = pages



        let str1 = "элементов";
        let str2 = "элемент";
        let str3 = "элемента";
        let str4 = "странице";
        let str5 = "страницах";
        //let pages = Math.round(res / 10) + 1
        // для кнопки справа

        let limit = 10;
        let totalPages = Math.ceil(this.props.res / limit)

        let num = [];
        for (let i = 0; i < totalPages + 1; i++) {
            num.push(i)
        }

        let lastIndex = totalPages <= 10 ? totalPages: this.state.page + limit;
        let firstIndex = totalPages <= 10 ? lastIndex - limit + lastIndex - 1 : lastIndex - limit







        return (
            <>
                <div className="search">
                    <input
                        type="search"
                        placeholder="Search"
                        value={this.state.search}
                        //Вариант с call back функцией т.к вторым параметром setState может принять функцию!

                        /* onChange={(e) => this.setState({ search: e.target.value }, () => searchMovie(this.state.search))
                        } */

                        //Еще один вариант без Call back в setState
                        /*                         onChange={(event=>{
                                                    let value = event.target.value;
                                                    this.setState({search: value});
                                                    searchMovie(value);
                                                })} */
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onKeyDown={this.hahdleKey}
                    />
                    <button
                        className="btn"
                        onClick={() => this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
                    >Search</button>
                </div>
                <div className="radio">
                    <input type="radio" name="type" checked={this.state.type === "all"} onChange={this.handleFilter} data-type="all" id="all" /> <label htmlFor="all">All</label>
                    <input type="radio" name="type" checked={this.state.type === "movies"} onChange={this.handleFilter} data-type="movies" id="movies" /> <label htmlFor="movies">Movies</label>
                    <input type="radio" name="type" checked={this.state.type === "series"} onChange={this.handleFilter} data-type="series" id="series" /> <label htmlFor="series">Series</label>
                    <input type="radio" name="type" checked={this.state.type === "game"} onChange={this.handleFilter} data-type="game" id="games" /> <label htmlFor="games">Games</label>
                </div>

                <div className="navigation">
                    <button className="btn" onClick={this.prevPage}>Previuos</button>
                    {/*                     <span>

                        
                        {minLeft > 2 ? <span className="dotted"><button className="btn" onClick={() => this.clickMe(toStart)}>{toStart}</button>...</span> : null}
                        
                        {minLeft > 1 ? <button className="btn" onClick={() => this.clickMe(leftTwo)}>{leftTwo}</button> : null}
                        
                        {minLeft > 0 ? <button className="btn" onClick={() => this.clickMe(leftOne)}>{leftOne}</button> : null}
                        
                        <button className="btn" id="selected" onClick={() => this.clickMe(this.state.page)}>{this.state.page}</button>
                       
                        {minRight >= 1 ? <button className="btn" onClick={() => this.clickMe(rightOne)}>{rightOne}</button> : null}
                        
                        {minRight >= 2 ? <button className="btn" onClick={() => this.clickMe(rightTwo)}>{rightTwo}</button> : null}
                        
                        {minRight > 3 ? <span className="dotted" onClick={() => this.clickMe(toEnd)}>...<button className="btn">{toEnd}</button></span> : null}

                    </span> */}

                    <div className="items">
                        {
                            num.slice(firstIndex, lastIndex+1).map((el, index) => (
                                <button className="btn" key={index} style={{ background: this.state.page !== el ? "" : "gray" }} onClick={() => this.setPage(el)}>{el}</button>
                            ))
                        }
                    </div>
                    <button className="btn" onClick={this.nextPage}>Next</button>
                </div>

                <div className="resultFooter">Найдено {res} {res % 10 === 0 ? str1 : res % 10 === 1 || 2 || 3 || 4 ? str3 : str2} на {pages} {pages > 1 ? str5 : str4}
                </div>

            </>
        )
    }
}

export default Search;
