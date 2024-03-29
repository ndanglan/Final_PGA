import
React, {
  useState,
  memo,
  useEffect
} from 'react'
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider
} from 'react-hook-form'
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Button,
  FormHelperText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import NumberFormat from 'react-number-format';
import FormControlGroup from '../../common/components/FormControlGroup'
import {
  BG_DISABLE,
  DARK_PURPLE,
  DARK_BLUE,
  WHITE_COLOR,
  MEDIUM_BLUE,
  MEDIUM_PURPLE,
} from '../../../configs/colors';
import FormSeperateSpace from '../../common/components/FormSeperateSpace';
import UtilComponent from '../../common/components/UtilComponent';
import ControlAutocompleteInput from '../../common/components/ControlAutocompleteInput'
import {
  detailsProductProps,
  FormValuesProps
} from '../../../models/products';
import {
  CommonSelectProps,
  FetchCategoryProps,
  FetchVendorsProps
} from '../../../models/common'
import ControlNormalInput from '../../common/components/ControlNormalInput';
import ControlSelectInput from '../../common/components/ControlSelectInput';
import ControlFileInput from '../../common/components/ControlFileInput';
import ControlAutocompleteMultipleInput from '../../common/components/ControlAutocompleteMultipleInput';
import ControlTextEditorInput from './ControlTextEditorInput';
import ControlSwitchInput from '../../common/components/ControlSwitchInput';
import { timeToDateType } from '../../common/utils';
import ControlCalendarInput from './ControlCalendarInput'
import useFetchCommonData from '../../common/hooks/useFetchCommonData';
import { API_PATHS } from '../../../configs/api';

interface Props {
  productDetails?: detailsProductProps,
  title: string,
  onPostProduct(formData: FormValuesProps): void,
}

const useStyles = makeStyles(({
  disableLabel: {
    display: 'flex',

    '& p': {
      flex: '1',
      width: '100%',
      fontSize: '0.875rem',
      borderRadius: '5px 0 0 5px',
      padding: '0.5rem 1rem ',
      backgroundColor: BG_DISABLE,
      color: 'rgba(180,180,219,0.48)',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },

  priceInput: {
    backgroundColor: DARK_BLUE,
    color: WHITE_COLOR,
    width: '100%',
    borderRadius: '0.25rem',
    fontSize: '0.9375rem',
    lineHeight: '1.5rem',
    padding: '10px 15px',
    margin: '0',
    height: '100% !important',
    border: `1px solid ${MEDIUM_PURPLE} !important`,

    '&:focus-visible': {
      outline: 'none'
    }
  },

  select: {
    '&.MuiOutlinedInput-root': {
      borderRadius: '0.25rem',
      color: '#fff',
      width: '40%',

      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: MEDIUM_PURPLE
      },

      '& .MuiSelect-select': {
        backgroundColor: MEDIUM_BLUE,
        border: `1px solid ${MEDIUM_PURPLE}`,
        color: '#fff',
        textAlign: 'left',
        fontSize: '0.9375rem',
        lineHeight: '1.5rem',
        padding: '8px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '& .MuiSvgIcon-root': {
        color: '#fff'
      },

      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        '& legend': {
          width: '0',
        }
      }
    }
  },

  dropdown: {
    '&.MuiList-root': {
      position: 'absolute',
      zIndex: '999',
      top: '50px',
      maxWidth: '368px',
      width: '100%',
      bgcolor: DARK_PURPLE,
      maxHeight: '300px',
      overflowY: 'scroll',
      backgroundColor: DARK_PURPLE,

      '& .MuiListItemButton-root:hover': {
        backgroundColor: MEDIUM_PURPLE
      }
    }
  },
}))

const ProductForm = (props: Props) => {
  const { title, productDetails, onPostProduct } = props;

  const classes = useStyles();

  const { data: brands } = useFetchCommonData(API_PATHS.getBrands);
  const { data: categories } = useFetchCommonData(API_PATHS.getCategory);
  const { data: shipping } = useFetchCommonData(API_PATHS.getShipping);
  const { data: vendors } = useFetchCommonData(API_PATHS.getVendors);

  const methods = useForm<FormValuesProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      id: '',
      vendor_id: '',
      name: '',
      brand_id: '',
      condition_id: "",
      categories: [],
      description: "",
      enabled: 1,
      memberships: [],
      shipping_to_zones: [{
        id: '1',
        price: '',
        zone_id: '',
        zone_name: 'Continental U.S.'
      }],
      tax_exempt: 0,
      price: "",
      sale_price_type: "$",
      arrival_date: new Date(),
      inventory_tracking: 0,
      quantity: '',
      sku: '1' + Math.floor(Math.random() * 1000000000000).toString(),
      participate_sale: 0,
      sale_price: '',
      og_tags_type: '0',
      og_tags: '',
      meta_desc_type: "A",
      meta_description: '',
      meta_keywords: '',
      product_page_title: '',
      facebook_marketing_enabled: 0,
      google_feed_enabled: 0,
      imagesOrder: [],
      deleted_images: [],
      images: []
    }
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: methods.control,
    name: "shipping_to_zones",
  });

  console.log(methods.formState.isValid)

  const [shippingLocation, setShippingLocation] = useState<{
    id: number | null | string,
    name: string,
    price: string
  }>({
    id: null,
    name: '',
    price: ''
  })

  const onSubmit = (data: FormValuesProps) => {
    onPostProduct(data)
  };

  const handleAddShippingLocationField = (location: {
    id: number | null | string,
    name: string,
    price: string
  }) => {
    const isExisted = fields.find(item => item.zone_id.toString() === location.id);
    if (isExisted) {
      return;
    }

    if (location.id) {
      append({
        id: location?.id.toString(),
        price: location.price,
        zone_id: location?.id.toString(),
        zone_name: location.name,
      })
    }
  }

  useEffect(() => {

    if (productDetails) {
      methods.setValue('id', productDetails.id)

      methods.setValue('vendor_id',
        productDetails.vendor_id);

      methods.setValue('name', productDetails.name)

      methods.setValue('brand_id',
        productDetails.brand_id)

      methods.setValue('condition_id',
        productDetails.condition_id)

      // chuyển categories ở server về định dạng format của inputMultipleselect
      methods.setValue('categories',
        productDetails.categories.map(item =>
          ({ id: item.category_id, name: item.name })
        ))

      methods.setValue('description',
        productDetails.description)

      methods.setValue('enabled',
        parseInt(productDetails.enabled))

      // format lại membership để hiển thị
      if (productDetails.memberships && productDetails.memberships.length > 0) {
        methods.setValue('memberships',
          productDetails.memberships.map((item: any) => +item.membership_id))
      } else {
        methods.setValue('memberships',
          [])
      }

      methods.setValue('tax_exempt',
        parseInt(productDetails.tax_exempt))

      methods.setValue('price', productDetails.price)

      methods.setValue('participate_sale',
        parseInt(productDetails.participate_sale))

      methods.setValue('sale_price_type',
        productDetails.sale_price_type)

      methods.setValue('sale_price',
        productDetails.sale_price)

      methods.setValue('arrival_date',
        timeToDateType(+productDetails.arrival_date))

      methods.setValue('inventory_tracking',
        parseInt(productDetails.inventory_tracking))

      methods.setValue('quantity', productDetails.quantity)

      methods.setValue('sku', productDetails.sku)

      methods.setValue('og_tags_type',
        productDetails.og_tags_type)

      methods.setValue('og_tags',
        productDetails.og_tags)

      methods.setValue('meta_desc_type',
        productDetails.meta_desc_type)

      methods.setValue('meta_description',
        productDetails.meta_description)

      methods.setValue('meta_keywords',
        productDetails.meta_keywords)

      methods.setValue('product_page_title',
        productDetails.product_page_title)

      methods.setValue('facebook_marketing_enabled',
        parseInt(productDetails.facebook_marketing_enabled))

      methods.setValue('google_feed_enabled',
        parseInt(productDetails.google_feed_enabled))

      methods.setValue('imagesOrder', productDetails.images.map(item => item.file))

      if (productDetails.shipping.length >= 1) {
        replace(productDetails.shipping.map(item => ({
          id: item.id,
          zone_id: item.id,
          zone_name: item.zone_name,
          price: item.price
        })))
      } else {
        replace([{
          id: '1',
          zone_id: '1',
          price: '',
          zone_name: 'Continental U.S.'
        }])
      }
    }
  }, [productDetails, methods, replace, append])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="part1">
          <Typography variant="h4" sx={{
            marginBottom: '30px'
          }}>
            {title}
          </Typography>

          {/*  vendor autocomplete */}
          <ControlAutocompleteInput
            label='vendor'
            name="vendor_id"
            data={vendors?.map(
              (item: FetchVendorsProps) =>
                ({ id: item.id, name: item.name }))
            }
            required={{
              value: true,
              message: 'This field is required'
            }}
          />

          {/* name input */}
          <ControlNormalInput
            label="Product Title"
            required={{
              value: true,
              message: 'This field is required'
            }}
            placeHolder="Type title "
            name="name"
          />

          {/* // Brand autocomplete */}
          <ControlAutocompleteInput
            label='Brand'
            name="brand_id"
            data={brands
              ? brands as CommonSelectProps[]
              : undefined}
            required={{
              value: true,
              message: 'This field is required'
            }}
          />

          {/* condition select */}
          <ControlSelectInput
            label="Condition"
            required={{
              value: true,
              message: 'This field is required'
            }}
            name="condition_id"
            data={[{ value: '292', name: 'Used' }]}
          />
          {methods.watch('condition_id') && (
            <ControlSelectInput
              label="Used Conditions"
              required={{
                value: false,
                message: ''
              }}
              name="inventory_tracking"
              data={[]}
            />
          )}

          {/* sku input */}
          <ControlNormalInput
            label="SKU"
            name='sku'
            required={{
              value: false,
              message: ''
            }}
          />

          {/* file input */}
          <ControlFileInput
            name='images'
            label='Image'
            required={{
              value: true,
              message: 'This field is required'
            }}
            images={productDetails?.images?.map(image => {
              return ({
                id: image.id,
                file: image.thumbs[0]
              })
            })}
          />

          {/* categories autocomplete */}
          <ControlAutocompleteMultipleInput
            required={{
              value: true,
              message: "This field is required"
            }}
            label='Category'
            name='categories'
            data={categories?.map(
              (item: FetchCategoryProps) =>
                ({ id: item.id, name: item.name }))}
            placeHolder="Choose category"
          />

          {/* texteditor input */}
          <ControlTextEditorInput
            label='Description'
            name='description'
            required={{
              value: true,
              message: "This field is required"
            }}
          />

          {/* switch input control enable for sale */}
          <ControlSwitchInput
            label={'Available for sale'}
            required={{
              value: true,
              message: "This field is required"
            }}
            name='enabled'
          />
        </div >
        <FormSeperateSpace />
        <div className="part2">
          <Typography variant="h4" sx={{
            margin: '15px 0'
          }}>
            Prices & Inventory
          </Typography>

          {/* membership input */}
          <ControlSelectInput
            label="Memberships"
            required={{
              value: false,
              message: ''
            }}
            name="memberships"
            multiple={true}
            data={[{
              value: 4,
              name: 'General'
            }]}
          />

          {/* tax exempt input */}
          <FormControlGroup
            label="Tax class"
            required={false}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0.25rem 0'
            }}>
              <p style={{
                margin: '0'
              }}
              >
                Default
              </p>
              <Controller
                control={methods.control}
                name="tax_exempt"
                render={({
                  field: { onChange, onBlur, value, ref }
                }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          padding: 0
                        }}
                        checked={value === 1 ? true : false}
                        onBlur={onBlur}
                        onChange={(e) => {
                          if (e.target.checked) {
                            onChange(1);
                            return;
                          }

                          onChange(0)
                        }}
                        inputRef={ref}
                      />}
                    label="Tax Exempt"
                    sx={{
                      alignItems: 'flex-start',
                      columnGap: '5px'
                    }}
                  />
                )}
              />
            </div>
          </FormControlGroup>

          {/* Price and sale input */}
          <FormControlGroup
            label="Price"
            required={true}
            inputSize={6}
            errorsType={methods.formState.errors.price?.type}
          >
            <Grid container>
              <Grid container md={4} >
                <Grid item md={3} className={classes.disableLabel}>
                  <p>$</p>
                </Grid>
                <Grid item md={9} >
                  <Controller
                    render={({ field: { onChange, ...others } }) => (
                      <NumberFormat
                        className={classes.priceInput}
                        placeholder="0.00"
                        decimalScale={2}
                        thousandSeparator
                        onValueChange={(e) => {
                          onChange(e.floatValue)
                        }}
                        {...others}
                      />
                    )}
                    name="price"
                    control={methods.control}
                    rules={{
                      required: true
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item md={2}
                sx={{
                  marginLeft: '30px'
                }}
              >
                <Controller
                  control={methods.control}
                  name="participate_sale"
                  render={({
                    field: { onChange, ...others }
                  }) => (
                    <FormControlLabel
                      {...others}
                      control={
                        <Checkbox
                          sx={{
                            padding: 0
                          }}
                          checked={others.value === 1 ? true : false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              onChange(1);
                              return;
                            }
                            onChange(0)
                          }}
                        />}
                      label="Sale"
                      sx={{
                        width: '100%'
                      }}
                    />
                  )}
                />
              </Grid>
              {methods.watch('participate_sale') === 1 && (
                <Grid item md={5} >
                  <FormControl
                    sx={{
                      flexDirection: "row"
                    }}>
                    <Controller
                      control={methods.control}
                      name="sale_price_type"
                      render={({ field }) => (
                        <Select
                          {...field}
                          className={classes.select}
                          displayEmpty
                          MenuProps={{
                            PaperProps: {
                              style: {
                                backgroundColor: '#323259',
                                color: '#fff',
                                top: '205px !important'
                              }
                            }
                          }}
                        >
                          <MenuItem
                            value={'$'}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(180,180,219,0.16)'
                              }
                            }}
                          >
                            $
                          </MenuItem>
                          <MenuItem
                            value={'%'}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(180,180,219,0.16)'
                              }
                            }}
                          >
                            %
                          </MenuItem>
                        </Select>
                      )}
                    />
                    <Controller
                      control={methods.control}
                      name="sale_price"
                      render={({ field: { onChange, ...others } }) => (
                        <NumberFormat
                          className={classes.priceInput}
                          placeholder="0.00"
                          decimalScale={2}
                          thousandSeparator
                          onValueChange={(e) => {
                            onChange(e.floatValue)
                          }}
                          {...others}
                        />
                      )}
                      rules={{
                        validate: {
                          percent: value => {
                            if (methods.watch('sale_price_type') === '%') {
                              return +value < 100
                            }
                          },
                          pureValue: value => {
                            if (methods.watch('sale_price_type') === '$') {
                              return +value < +methods.watch('price')
                            }
                          }
                        }
                      }}
                    />
                  </FormControl>
                </Grid>
              )}
            </Grid>
            {methods.formState.errors?.sale_price?.type === 'pureValue' && (
              <FormHelperText
                sx={{
                  textAlign: 'end',
                  paddingRight: "90px"
                }}
                error={true}>
                Sale price exceed net price
              </FormHelperText>

            )}
            {
              methods.formState.errors?.sale_price?.type === 'percent' && (
                <FormHelperText
                  sx={{
                    textAlign: 'end',
                    paddingRight: "90px"
                  }}
                  error={true}
                >
                  Sale percent must be less than 100%
                </FormHelperText>

              )
            }
          </FormControlGroup>

          {/* Date picker input */}
          <ControlCalendarInput
            label="Arrival date"
            name="arrival_date"
            required={false}
            inputSize={6}
          />

          <ControlNormalInput
            label="Quantity in stock"
            required={{
              value: true,
              message: 'This field is required'
            }}
            name='quantity'
            inputSize={2}
          />
        </div>
        <FormSeperateSpace />

        <div className="part3">
          <Typography variant="h4" sx={{
            margin: '15px 0'
          }}>
            Shipping
          </Typography>
          {fields.map((field, index) => {
            if (index === 0) {
              return (
                <FormControlGroup
                  key={field.id}
                  label={field.zone_name}
                  required={true}
                  inputSize={6}
                  errorsType={methods.formState.errors?.shipping_to_zones?.[index]?.price ? "required" : undefined}
                >
                  <Grid container
                    sx={{
                      position: 'relative'
                    }}>
                    <Grid item md={1} className={classes.disableLabel}>
                      <p>
                        $
                      </p>
                    </Grid>
                    <Grid item md={6}>
                      <Controller
                        control={methods.control}
                        name={`shipping_to_zones.${index}.price`}
                        render={({ field: { value, ...others } }) => {

                          return (
                            <NumberFormat
                              className={classes.priceInput}
                              placeholder="0.00"
                              decimalScale={2}
                              value={value}
                              thousandSeparator
                              {...others}
                            />
                          )
                        }}
                        rules={{
                          required: true
                        }}
                      />
                    </Grid>
                  </Grid>
                </FormControlGroup>
              )
            }
            return (
              <FormControlGroup
                key={index}
                label={field.zone_name}
                required={false}
                inputSize={3}
              >
                <Grid container
                  sx={{
                    position: 'relative',
                  }}>
                  <Grid item md={2} className={classes.disableLabel}>
                    <p>
                      $
                    </p>
                  </Grid>
                  <Grid item md={6}>
                    <Controller
                      control={methods.control}
                      name={`shipping_to_zones.${index}.price`}
                      render={({ field: fieldData }) => (
                        <NumberFormat
                          className={classes.priceInput}
                          placeholder="0.00"
                          decimalScale={2}
                          thousandSeparator
                          {...fieldData}
                        />
                      )}
                    />
                  </Grid>
                  <div style={{
                    marginLeft: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}>
                    <span
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </Grid>
              </FormControlGroup>
            )
          })}

          <FormControlGroup
            label=""
            required={false}
            inputSize={5}
          >
            <Grid container sx={{
              justifyContent: 'space-between'
            }}>
              <Grid
                item
                md={6}
                sx={{
                  position: 'relative',
                }}>
                <Select
                  label=""
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#323259',
                        color: '#fff',
                      }
                    }
                  }}
                  value={shippingLocation.name}
                >
                  {shipping && shipping?.map((item: CommonSelectProps) => (
                    <MenuItem
                      key={item.id}
                      value={item.name}
                      onClick={() => {
                        setShippingLocation({
                          id: item.id,
                          name: item.name,
                          price: ''
                        })
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid
                item
                md={5}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <span
                  style={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (shippingLocation.id) {
                      handleAddShippingLocationField(shippingLocation)

                      setShippingLocation({
                        id: null,
                        price: '',
                        name: ''
                      })
                    }
                  }}
                >
                  Add shipping Location
                </span>
              </Grid>
            </Grid>
          </FormControlGroup>
        </div>
        <FormSeperateSpace />
        <div className="part4">
          <Typography variant="h4" sx={{
            margin: '15px 0'
          }}>
            Marketing
          </Typography>
          <ControlSelectInput
            label="Open Graph meta tags"
            name="og_tags_type"
            required={{
              value: false,
              message: ''
            }}
            data={[
              {
                value: '0',
                name: 'Autogenerated'
              },
              {
                value: '1',
                name: 'Custom'
              }
            ]}
          />
          {methods.watch('og_tags_type') === '1' && (
            <ControlNormalInput
              name='og_tags'
              label=''
              required={{
                value: false,
                message: ''
              }}
            />
          )}
          <ControlSelectInput
            label="Meta description"
            name="meta_desc_type"
            required={{
              value: false,
              message: ''
            }}
            data={[
              {
                value: 'A',
                name: 'Autogenerated'
              },
              {
                value: 'C',
                name: 'Custom'
              }
            ]}
          />
          {methods.watch('meta_desc_type') === 'C' && (
            <ControlNormalInput
              name='meta_description'
              label=''
              required={{
                value: false,
                message: ''
              }}
            />
          )}

          <ControlNormalInput
            name='meta_keywords'
            label="Meta keywords"
            required={{
              value: false,
              message: ''
            }}
          />

          <ControlNormalInput
            name='product_page_title'
            label="Product page title"
            required={{
              value: false,
              message: ''
            }}
            helperText='Leave blank to use product name as Page Title.'
          />

          <ControlSwitchInput
            label="Add to Facebook product feed"
            required={{
              value: false,
              message: ""
            }}
            name='facebook_marketing_enabled'
          />

          <ControlSwitchInput
            label="Add to Google product feed"
            required={{
              value: false,
              message: ""
            }}
            name='google_feed_enabled'
          />
        </div>
        <UtilComponent>
          <div >
            <Button
              type="submit"
              sx={{
                backgroundColor: "#f0ad4e",
                color: '#fff'
              }}
              disabled={Object.keys(methods.formState.errors).length !== 0}
            >
              {methods.watch('id')
                ? 'Update Product'
                : 'Add Product'}
            </Button>
          </div>
        </UtilComponent >
      </form >
    </FormProvider>
  )
}

export default memo(ProductForm)