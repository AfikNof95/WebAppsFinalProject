import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Slider,
  TextField
} from '@mui/material';
import Switch from '@mui/material/Switch';
import StockIcon from '@mui/icons-material/Inventory';
import FilterIcon from '@mui/icons-material/Tune';
import PriceIcon from '@mui/icons-material/AttachMoney';
import { formatPrice } from '../../utils/formatPrice';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FilterAltOff from '@mui/icons-material/FilterAltOff';
const Filters = ({ selectedCategoryId, priceRange, deviceType }) => {
  const SORT_BY_ENUM = {
    NAME_ASCENDING: { value: 'NAME_ASCENDING', sort: { name: 1 } },
    NAME_DESCENDING: { value: 'NAME_DESCENDING', sort: { name: -1 } },
    PRICE_ASCENDING: { value: 'PRICE_ASCENDING', sort: { price: 1 } },
    PRICE_DESCENDING: { value: 'PRICE_DESCENDING', sort: { price: -1 } }
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [freeText, setFreeText] = useState('');
  const [sortBy, setSortBy] = useState(SORT_BY_ENUM.NAME_ASCENDING);
  const [filterOutOfStock, setFilterOutOfStock] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const [currentPriceRange, setCurrentPriceRange] = useState(priceRange);

  useEffect(() => {
    const priceRangeArray =
      searchParams.get('minPrice') && searchParams.get('maxPrice')
        ? [Number(searchParams.get('minPrice')), Number(searchParams.get('maxPrice'))]
        : priceRange;

    const outOfStockFilter = searchParams.get('filterOutOfStock') === 'true' ? true : false;

    let sortByValue = Object.values(SORT_BY_ENUM).filter((value) => {
      return JSON.stringify(value.sort) === searchParams.get('sort');
    });
    sortByValue = sortByValue[0] || SORT_BY_ENUM.NAME_ASCENDING;

    const freeTextValue = searchParams.get('freeText') || '';
    const searchTerm = searchParams.get('searchTerm') || null;

    setCurrentPriceRange(priceRangeArray);
    setFilterOutOfStock(outOfStockFilter);
    setSortBy(sortByValue);
    setFreeText(freeTextValue);
    setIsSearch(searchTerm !== null);
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategoryId === undefined) {
      return;
    }
    if (selectedCategoryId !== searchParams.get('categoryId')) {
      navigate({ search: `categoryId=${selectedCategoryId}` });
    }
  }, [selectedCategoryId]);

  const toggleOpenFilters = (event) => {
    setIsFiltersOpen((currentState) => {
      return !currentState;
    });
    setAnchorEl(event.currentTarget);
  };

  const handleSortBy = (event) => {
    const value = event.target.value;
    setSortBy(SORT_BY_ENUM[value]);
    setSearchParams((currentState) => {
      currentState.set('sort', JSON.stringify(SORT_BY_ENUM[value].sort));
      return currentState;
    });
  };

  const handleFilterOutOfStock = (value) => {
    setFilterOutOfStock(value);
    setSearchParams((currentState) => {
      currentState.set('filterOutOfStock', value);
      return currentState;
    });
  };

  const handleChangePriceRange = (value) => {
    setCurrentPriceRange(value);
  };

  const handleCommitPriceRange = (value) => {
    setSearchParams((currentState) => {
      currentState.set('minPrice', value[0]);
      currentState.set('maxPrice', value[1]);
      return currentState;
    });
  };

  const handleFreeTextChange = (event) => {
    const value = event.target.value;
    setFreeText(value);
  };

  const handleFreeTextCommit = (event) => {
    setSearchParams((currentState) => {
      currentState.set('freeText', event.target.value);
      return currentState;
    });
  };

  const clearFilters = () => {
    setCurrentPriceRange(priceRange);
    setFilterOutOfStock(false);
    setSortBy(SORT_BY_ENUM.NAME_ASCENDING);
    setFreeText('');
    setSearchParams((currentState) => {
      return {
        ...(currentState.get('searchTerm') && {
          searchTerm: currentState.get('searchTerm')
        }),
        ...{
          ...(selectedCategoryId && {
            categoryId: selectedCategoryId
          })
        }
      };
    });
  };

  return (
    <ListItem disablePadding sx={() => deviceType === 'mobile' && { display: 'block' }}>
      <ListItemButton
        onClick={toggleOpenFilters}
        sx={() =>
          deviceType === 'mobile' && {
            minHeight: 48,
            justifyContent: 'center',
            px: 2.5
          }
        }>
        {deviceType !== 'mobile' && (
          <>
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary="Filters"
              primaryTypographyProps={{
                fontSize: '0.9em',
                fontWeight: 'bold',
                color: '#1976d2'
              }}></ListItemText>
          </>
        )}

        <FilterIcon
          color="primary"
          sx={() =>
            deviceType === 'mobile' && {
              mr: 'auto',
              minWidth: 0,
              justifyContent: 'center'
            }
          }></FilterIcon>
      </ListItemButton>

      <Menu
        open={isFiltersOpen}
        onClose={toggleOpenFilters}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}>
        <Box sx={{ color: 'black' }}>
          <List>
            <ListItem>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="sort-by-label">Sort</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by-select"
                  value={sortBy.value}
                  label="Sort"
                  onChange={handleSortBy}>
                  <MenuItem value={SORT_BY_ENUM.NAME_ASCENDING.value}>Name Ascending</MenuItem>
                  <MenuItem value={SORT_BY_ENUM.NAME_DESCENDING.value}>Name Descending</MenuItem>
                  <MenuItem value={SORT_BY_ENUM.PRICE_ASCENDING.value}>Price Low To High</MenuItem>
                  <MenuItem value={SORT_BY_ENUM.PRICE_DESCENDING.value}>Price High To Low</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemText primary={'Filters'} sx={{ fontWeight: 'bold' }}></ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem>
              <ListItemIcon>
                <StockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText id="switch-list-label-wifi" secondary="Filter out of stock" />
              <Switch
                edge="end"
                onChange={(event, value) => handleFilterOutOfStock(value)}
                checked={filterOutOfStock}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-wifi'
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PriceIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText secondary="Price" />
            </ListItem>
            <ListItem>
              <Slider
                color="secondaryButton"
                getAriaLabel={() => 'Price range'}
                min={priceRange[0]}
                max={priceRange[1]}
                disableSwap
                value={currentPriceRange}
                onChange={(evemt, value) => handleChangePriceRange(value)}
                onChangeCommitted={(event, value) => handleCommitPriceRange(value)}
                valueLabelDisplay="auto"
                getAriaValueText={(value) => formatPrice(value)}
              />
            </ListItem>
            {!isSearch && (
              <ListItem>
                <TextField
                  onInput={handleFreeTextChange}
                  onBlur={handleFreeTextCommit}
                  variant="standard"
                  label="Free Text"
                  value={freeText}></TextField>
              </ListItem>
            )}
          </List>
        </Box>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button
            endIcon={<FilterAltOff></FilterAltOff>}
            onClick={clearFilters}
            color="secondaryButton">
            Clear
          </Button>
        </Box>
      </Menu>
    </ListItem>
  );
};

export default Filters;
