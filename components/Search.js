import React from 'react';
import Downshift, { resetIdCounter } from 'downshift'; // adds search functionality
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo'; // allows queries to run on demand
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
# takes in a single arg: $searchTerm, which is required(!)
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    # using or to handle an array of possible matches
    items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
      # returns each result's:
      id
      image
      title
    }
  }
`;

function routeToItem(item) {
  // fires when a user clicks a result
  Router.push({
    // routes user to the page associated to the item.id
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
}

class AutoComplete extends React.Component {

  state = {
    items: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {

    console.log('🔎 Searching...');
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
      // passes in the input value as the searchTerm
    });
    console.log(res);
    this.setState({
      items: res.data.items,
      loading: false,
    });
  }, 350);


  render() {
    // method from downshift that resets its key counter on each downshift element
    resetIdCounter();
    return (
      <SearchStyles>
        {/* downshift renders each item in its search as an object, the itemToString prop converts the object to a string for us. where we can access the title of the item */}
        <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)}>
          {/* onChange we also define a handler method that routes the link to the item page*/}
          {/* destructure props from render props payload */}
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (

            <div>
              <ApolloConsumer>
                {/* using apollo consumer to allow for on-demand querying of data:  */}
                {client => (
                  // client is available via the Consumer.
                  <input
                    // method that spreads out props from downshift
                    {...getInputProps({
                      // passing along additional props for the input field:
                      type: "search",
                      placeholder: 'search for an item',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (

                <DropDown>
                  {/* map thru all items in state */}
                  {this.state.items.map((item, index) => (
                    // render a dropdownitem for each item in the list:
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!this.state.items.length && !this.state.loading && (
                    <DropDownItem>
                      No items match {inputValue}
                    </DropDownItem>
                  )}
                </DropDown>

              )}
            </div>

          )}
        </Downshift>
      </SearchStyles>
    )
  }
}

export default AutoComplete;
