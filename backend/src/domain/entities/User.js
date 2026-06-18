export default class User {
  constructor({ id = null, name, email, password_hash, created_at = null } = {}) {
    this.id = id
    this.name = name
    this.email = email
    this.password_hash = password_hash
    this.created_at = created_at
  }
}
