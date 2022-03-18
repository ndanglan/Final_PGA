import React from 'react'
import { VendorDataProps } from '../../../models/userlist'
import LabelGroup from '../../common/components/LabelGroup'
import moment from 'moment'

interface Props {
  info: VendorDataProps['info']
}

const AccountDetailTag = (props: Props) => {
  const { info } = props
  return (
    <>
      <LabelGroup
        label="Orders placed as a buyer"
        required={false}
        value={`${info.order_as_buyer}($${info.order_as_buyer_total})`}
      />
      <LabelGroup
        label="Vendor Income"
        required={false}
        value={`$${info.income}`}
      />
      <LabelGroup
        label="Vendor Expense"
        required={false}
        value={`$${info.expense}`}
      />
      <LabelGroup
        label="Earning balance"
        required={false}
        value={`$${info.earning}`}
      />
      <LabelGroup
        label="Products listed as vendor"
        required={false}
        value={info.products_total}
      />
      <LabelGroup
        label="Joined"
        required={false}
        value={info.joined
          ? moment.unix(+info.joined).format('MMM DD, YYYY, LT')
          : 'none'
        }
      />
      <LabelGroup
        label="Last login"
        required={false}
        value={info.last_login
          ? moment.unix(+info.last_login).format('MMM DD, YYYY, LT')
          : 'never'
        }
      />
    </>
  )
}

export default AccountDetailTag