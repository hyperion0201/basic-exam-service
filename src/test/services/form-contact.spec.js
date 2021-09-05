import { expect } from 'chai'
import { createSandbox } from 'sinon'
import db from '../../core/db'
import { createFormContact, getDetailFormContact, getFormContact, updateMarkDone, deleteFormContact } from '../../services/form-contact'
import ServerError from '../../utils/custom-error'

describe('Form Contact Service', () => {
  let formContact
  beforeEach(() => {
    formContact = {
      id: 1,
      email: 'test@gmail.com',
      description: 'Test',
      markDone: false
    }
  })
  afterEach(() => {
    sanbox.restore()
  })
  const formContactModel = db.FormContact
  const sanbox = createSandbox()

  it('Create form contact error', async () => {
    const error = new ServerError({
      name: 'Something error when create form contract..',
      err: 'err'
    })
    sanbox.stub(formContactModel, 'create').throws()
    const result = await createFormContact(formContact).catch(error => error)
    expect(result.name).equal(error.name)
  })

  it('Create form contact successfully', async () => {
    sanbox.stub(formContactModel, 'create').resolves(formContact)
    const result = await createFormContact(formContact)
    expect(result).equal(formContact)
  })

  it('Get form contact error', async () => {
    const error = new ServerError({
      name: 'Something error when get detail form contract..',
      err: 'err'
    })
    sanbox.stub(formContactModel, 'findOne').throws()
    const result = await getDetailFormContact(formContact.id).catch(error => error)
    expect(result.name).equal(error.name)
  })

  it('Get form contact successfully', async () => {
    sanbox.stub(formContactModel, 'findOne').resolves(formContact)
    const result = await getDetailFormContact(formContact.id)
    expect(result).equal(formContact)
  })

  it('Get all form contact error', async () => {
    const error = new ServerError({
      name: 'Something error when get all form contract..',
      err: 'err'
    })
    sanbox.stub(formContactModel, 'findAll').throws()

    const result = await getFormContact().catch(error => error)
    expect(result.name).equal(error.name)
  })

  it('Get all form contact successfully', async () => {
    sanbox.stub(formContactModel, 'findAll').resolves([formContact])

    const result = await getFormContact()
    expect(result).to.include(formContact)
  })

  it('Update form contact mark done error', async () => {
    const error = new ServerError({
      name: 'Something error when get all form contract..',
      err: 'err'
    })
    sanbox.stub(formContactModel, 'update').throws()

    const result = await updateMarkDone(formContact.id).catch(error => error)
    expect(result.name).equal(error.name)
  })

  it('Update form contact mark done successfully', async () => {
    sanbox.stub(formContactModel, 'update').resolves(formContact)

    const result = await updateMarkDone(formContact.id)
    expect(result).equal(formContact)
  })

  it('Delete form contact error', async () => {
    const error = new ServerError({
      name: 'Something error when get delete form contract.',
      err: 'err'
    })
    sanbox.stub(formContactModel, 'destroy').throws()

    const result = await deleteFormContact(formContact.id).catch(error => error)
    expect(result.name).equal(error.name)
  })

  it('Delete form contact successfully', async () => {
    sanbox.stub(formContactModel, 'destroy').resolves(1)

    const result = await deleteFormContact(formContact.id)
    expect(result).equal(1)
  })
})
