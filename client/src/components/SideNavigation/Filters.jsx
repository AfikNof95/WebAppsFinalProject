import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
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
    Typography,
} from '@mui/material'
import Switch from '@mui/material/Switch'
import StockIcon from '@mui/icons-material/Inventory'
import FilterIcon from '@mui/icons-material/Tune'
import PriceIcon from '@mui/icons-material/AttachMoney'
import { formatPrice } from '../../utils/formatPrice'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
const Filters = ({ categoryName, priceRange }) => {
    const SORT_BY_ENUM = {
        NAME_ASCENDING: { value: 'NAME_ASCENDING', sort: { name: 1 } },
        NAME_DESCENDING: { value: 'NAME_DESCENDING', sort: { name: -1 } },
        PRICE_ASCENDING: { value: 'PRICE_ASCENDING', sort: { price: 1 } },
        PRICE_DESCENDING: { value: 'PRICE_DESCENDING', sort: { price: -1 } },
    }
    const [searchParams, setSearchParams] = useSearchParams()

    const [isFiltersOpen, setIsFiltersOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const [sortBy, setSortBy] = useState(() => {
        if (searchParams.get('sort')) {
            for (let [key, value] of Object.entries(SORT_BY_ENUM)) {
                if (JSON.stringify(value.sort) === searchParams.get('sort')) {
                    return value
                }
            }
        } else {
            return SORT_BY_ENUM.NAME_ASCENDING
        }
    })
    const [filterOutOfStock, setFilterOutOfStock] = useState(() => {
        if (searchParams.get('outOfStock')) {
            searchParams.get('outOfStock')
        } else {
            return false
        }
    })

    const [currentPriceRange, setCurrentPriceRange] = useState(() => {
        if (searchParams.get('minPrice') && searchParams.get('maxPrice')) {
            return [searchParams.get('minPrice'), searchParams.get('maxPrice')]
        } else {
            return priceRange
        }
    })

    const toggleOpenFilters = (event) => {
        setIsFiltersOpen((currentState) => {
            return !currentState
        })
        setAnchorEl(event.currentTarget)
    }

    const handleSortBy = (event) => {
        const value = event.target.value
        searchParams.set('sort', JSON.stringify(SORT_BY_ENUM[value].sort))
        setSortBy(SORT_BY_ENUM[value])
        setSearchParams(searchParams)
    }

    const handleFilterOutOfStock = (value) => {
        value === true
            ? searchParams.set('filterOutOfStock', value)
            : searchParams.delete('filterOutOfStock')
        setFilterOutOfStock(value)
        setSearchParams(searchParams)
    }

    const handlePriceRange = (value) => {
        searchParams.set('minPrice', value[0])
        searchParams.set('maxPrice', value[1])
        setSearchParams(searchParams)
        setCurrentPriceRange(value)
    }

    return (
        <div>
            <ListItemButton onClick={toggleOpenFilters}>
                <ListItemIcon></ListItemIcon>
                <ListItemText
                    primary="Filters"
                    primaryTypographyProps={{
                        fontSize: '0.9em',
                        fontWeight: 'bold',
                        color: '#1976d2',
                    }}
                ></ListItemText>
                <FilterIcon color="primary"></FilterIcon>
            </ListItemButton>

            <Menu
                open={isFiltersOpen}
                onClose={toggleOpenFilters}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ color: 'black' }}>
                    <Typography variant="h5" padding={2}>
                        {categoryName}
                    </Typography>
                    <Divider></Divider>
                    <List>
                        <ListItem>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="sort-by-label">Sort</InputLabel>
                                <Select
                                    labelId="sort-by-label"
                                    id="sort-by-select"
                                    value={sortBy.value}
                                    label="Sort"
                                    onChange={handleSortBy}
                                >
                                    <MenuItem
                                        value={
                                            SORT_BY_ENUM.NAME_ASCENDING.value
                                        }
                                    >
                                        Name Ascending
                                    </MenuItem>
                                    <MenuItem
                                        value={
                                            SORT_BY_ENUM.NAME_DESCENDING.value
                                        }
                                    >
                                        Name Descending
                                    </MenuItem>
                                    <MenuItem
                                        value={
                                            SORT_BY_ENUM.PRICE_ASCENDING.value
                                        }
                                    >
                                        Price Low To High
                                    </MenuItem>
                                    <MenuItem
                                        value={
                                            SORT_BY_ENUM.PRICE_DESCENDING.value
                                        }
                                    >
                                        Price High To Low
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={'Filters'}
                                sx={{ fontWeight: 'bold' }}
                            ></ListItemText>
                        </ListItem>
                        <Divider></Divider>
                        <ListItem>
                            <ListItemIcon>
                                <StockIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                id="switch-list-label-wifi"
                                secondary="Filter out of stock"
                            />
                            <Switch
                                edge="end"
                                onChange={(event, value) =>
                                    handleFilterOutOfStock(value)
                                }
                                checked={filterOutOfStock}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-wifi',
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
                                getAriaLabel={() => 'Price range'}
                                min={priceRange[0]}
                                max={priceRange[1]}
                                disableSwap
                                defaultValue={currentPriceRange}
                                onChangeCommitted={(event, value) =>
                                    handlePriceRange(value)
                                }
                                valueLabelDisplay="auto"
                                getAriaValueText={(value) => formatPrice(value)}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Menu>
        </div>
    )
}

export default Filters
