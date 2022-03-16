import React, { useEffect } from 'react'
import { Button, Grid, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form'
import FormSeperateSpace from '../../common/components/Layout/FormSeperateSpace';
import UtilComponent from '../../common/components/Layout/UtilComponent';
import ControlNormalInput from '../../common/components/ControlNormalInput';
import ControlSelectInput from '../../common/components/ControlSelectInput';
import InputCheckBox from '../../common/components/InputCheckBox'
import ControlAutocompleteMultipleInput from '../../common/components/ControlAutocompleteMultipleInput';
import { UserFormValues, VendorDataProps } from '../../../models/userlist';
import { emailRegex } from '../utils';
import TextAreaAutoSizeInput from '../../common/components/TextAreaAutoSizeInput';

interface Props {
  title: string,
  onSubmit(values: UserFormValues): void,
  vendorDetails?: VendorDataProps
}

const ACCOUNT_ROLES = [
  { id: '1', name: 'Administrator' },
  { id: '2', name: 'Coupons management' },
  { id: '3', name: 'Content management' },
  { id: '4', name: 'Volume discounts management' },
  { id: '5', name: 'Vendor' },
  { id: '6', name: 'View order reports' }
]

const UserForm = (props: Props) => {
  const methods = useForm<UserFormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      access_level: "",
      confirm_password: "",
      email: "",
      firstName: "",
      forceChangePassword: 0,
      lastName: "",
      membership_id: "",
      password: "",
      paymentRailsType: "",
      roles: [],
      taxExempt: 0,
      status: '',
      id: '',
      statusComment: ''
    }
  });

  const { title, onSubmit, vendorDetails } = props;

  useEffect(() => {
    if (vendorDetails) {
      methods.setValue('access_level', vendorDetails.info.access_level);

      methods.setValue('email', vendorDetails.info.email);

      methods.setValue('firstName', vendorDetails.info.firstName);

      methods.setValue('forceChangePassword', +vendorDetails.info.forceChangePassword);

      methods.setValue('lastName', vendorDetails.info.lastName);

      if (vendorDetails.info.membership_id !== null) {
        methods.setValue('membership_id', vendorDetails.info.membership_id);
      } else {
        methods.setValue('membership_id', 'none');
      }

      methods.setValue('paymentRailsType', vendorDetails.info.paymentRailsType);

      if (vendorDetails.info.roles.length > 0) {
        const newArr = vendorDetails.info.roles.map(item => {
          const roleObj = ACCOUNT_ROLES.find(role => role.id === item);

          if (roleObj) {
            return roleObj
          }

          return {
            id: '',
            name: ''
          };
        })

        if (newArr) {
          methods.setValue('roles', newArr)
        }
      }

      methods.setValue('taxExempt', +vendorDetails.info.taxExempt)

      methods.setValue('status', vendorDetails.info.status)

      methods.setValue('id', vendorDetails.info.profile_id)
    }
  }, [vendorDetails, methods])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="part1">
          <Typography variant="h4" sx={{
            marginBottom: '30px'
          }}>
            {title}
          </Typography>

          {/* name input */}
          <ControlNormalInput
            label="First Name"
            required={{
              value: true,
              message: 'This field is required'
            }}
            placeHolder=""
            name="firstName"
            inputSize={3}
            labelSize={3}
          />

          {/* name input */}
          <ControlNormalInput
            label="Last Name "
            required={{
              value: true,
              message: 'This field is required'
            }}
            placeHolder=""
            name="lastName"
            inputSize={3}
            labelSize={3}
          />

          {/* name input */}
          <ControlNormalInput
            label="Email"
            required={{
              value: true,
              message: 'This field is required'
            }}
            placeHolder=""
            name="email"
            inputSize={3}
            labelSize={3}
            pattern={{
              value: emailRegex,
              message: 'Email format is invalid'
            }}
          />

          {/* name input */}
          <ControlNormalInput
            label="Password"
            type="password"
            required={{
              value: vendorDetails ? false : true,
              message: 'This field is required'
            }}
            placeHolder=""
            name="password"
            inputSize={3}
            labelSize={3}
          />

          {/* name input */}
          <ControlNormalInput
            label="Confirm Password"
            type="password"
            required={{
              value: vendorDetails ? false : true,
              message: 'This field is required'
            }}
            placeHolder=""
            name="confirm_password"
            inputSize={3}
            labelSize={3}
            validate={
              (value: string) => value === methods.watch('password') || 'Password not match'
            }
          />

          {/* condition select */}
          <ControlSelectInput
            label="Type"
            required={{
              value: false,
              message: ''
            }}
            inputSize={3}
            labelSize={3}
            name="paymentRailsType"
            data={[
              { value: 'individual', name: 'Individual' }, { value: 'business', name: 'Business' }
            ]}
          />
          {vendorDetails && vendorDetails.info.paymentRailsId ? (
            <Grid
              container
              columnGap={2.5}
              sx={{
                marginBottom: '1.5rem'
              }}>
              <Grid item md={3} sx={{
                textAlign: 'end',
                padding: '0 15px',
              }}>
                PaymentRails ID
              </Grid>
              <Grid item md={3}>
                {vendorDetails.info.paymentRailsId}
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              columnGap={2.5}
              sx={{
                marginBottom: '1.5rem'
              }}>
              <Grid item md={3} sx={{
                textAlign: 'end',
                padding: '0 15px',
              }}>
                PaymentRails ID
              </Grid>
            </Grid>
          )}
        </div>
        <FormSeperateSpace />
        <div>
          <Typography variant="h4" sx={{
            margin: '15px 0'
          }}>
            Access information
          </Typography>
          <ControlSelectInput
            label="Access level "
            required={{
              value: true,
              message: 'This field is required'
            }}
            inputSize={3}
            labelSize={3}
            name="access_level"
            data={[
              { value: '100', name: 'Admin' },
              { value: '10', name: 'Vendor' }
            ]}
          />
          {methods.watch('access_level') === '100' && (
            <ControlAutocompleteMultipleInput
              label="Roles"
              required={{
                value: false,
                message: ''
              }}
              inputSize={3}
              labelSize={3}
              name="roles"
              data={ACCOUNT_ROLES}
            />
          )}
          {vendorDetails && (
            <ControlSelectInput
              label="Account status"
              required={{
                value: true,
                message: 'This field is required'
              }}
              inputSize={3}
              labelSize={3}
              name="status"
              data={[
                { value: 'D', name: 'Disabled' },
                { value: 'E', name: 'Enabled' },
                { value: 'U', name: 'Unapproved vendor' }
              ]}
            />
          )}
          {vendorDetails && (
            <TextAreaAutoSizeInput
              label="Status comment (reason)"
              name="statusComment"
              required={false}
              inputSize={5}
              labelSize={3}
            />
          )}
          <ControlSelectInput
            label="Membership"
            required={{
              value: false,
              message: ''
            }}
            inputSize={3}
            labelSize={3}
            name="membership_id"
            data={[
              { value: 'none', name: 'Ignore Membership' },
              { value: '4', name: 'General' }
            ]}
          />
          <InputCheckBox
            label="Require to change password on next log in"
            name='forceChangePassword'
            required={false}
            labelSize={3}
            dataTrue={1}
            dateFalse={0}
          />
        </div>
        <FormSeperateSpace />
        <div>
          <Typography variant="h4" sx={{
            margin: '15px 0'
          }}>
            Tax information
          </Typography>
          <InputCheckBox
            label="Tax exempt"
            name='taxExempt'
            required={false}
            labelSize={3}
            dataTrue={1}
            dateFalse={0}
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
            >
              {vendorDetails ? 'Update account' : 'Create account'}
            </Button>
          </div>
        </UtilComponent >
      </form >
    </FormProvider>
  )
}

export default UserForm