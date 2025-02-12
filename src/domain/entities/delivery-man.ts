import { Entity } from './entity'

interface DeliveryManProps {
  name: string
  email: string
  cpf: string
  password: string
}

export class DeliveryMan extends Entity<DeliveryManProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  static create(props: DeliveryManProps, id?: string) {
    const deliveryMan = new DeliveryMan(
      {
        email: props.email,
        cpf: props.cpf,
        name: props.name,
        password: props.password,
      },
      id,
    )

    return deliveryMan
  }
}
