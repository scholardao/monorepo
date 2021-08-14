import { BigInt, Bytes, Value } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  PaperCreated,
  ReviewAdded,
  Transfer,
  Accepted,
  Validated,
  ValidationRequestSent,
  ValidatorConfirmed,
  ValidatorResponseSent,
  ScholarVerified,
  ValidatorVerified
} from "../generated/Paper/Paper"
import { Paper, Scholar } from "../generated/schema"

// export function handleApproval(event: Approval): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from.toHex())

//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (entity == null) {
//     entity = new ExampleEntity(event.transaction.from.toHex())

//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0)
//   }

//   // BigInt and BigDecimal math are supported
//   entity.count = entity.count.plus(BigInt.fromI32(1))

//   // Entity fields can be set based on event parameters
//   entity.owner = event.params.owner
//   // entity.approved = event.params.approved

//   // Entities can be written to the store with `.save()`
//   entity.save()

//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.

//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.acceptValidationRequest(...)
//   // - contract.balanceOf(...)
//   // - contract.getApproved(...)
//   // - contract.isApprovedForAll(...)
//   // - contract.name(...)
//   // - contract.ownerOf(...)
//   // - contract.selectValidator(...)
//   // - contract.supportsInterface(...)
//   // - contract.symbol(...)
//   // - contract.tokenURI(...)
//   // - contract.verifyScholarProfile(...)
// }

// export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handlePaperCreated(event: PaperCreated): void {
  let paper = new Paper(event.params.id.toHex())
  paper.owner = event.params.owner

  paper.author = event.params.author.toHex()
  // paper.author = event.params.author.toString()
  // paper.citedBy
  // let citations = event.params.citationsUsed.map(c => {
  //   return c.toString();
  // });
  paper.citationsUsed = ['1'];
  // paper.id = 
  paper.tokenURI = event.params.tokenURI
  paper.title = '';
  paper.validatorTip = event.params.validatorTip
  // paper.peerReviewers = [Bytes.fromI32(event.params.author.toHex())]
  paper.fields = ['randomfield']
  // validatorTip: BigInt!
  paper.deadline = BigInt.fromI32(10000)
  paper.stage = "Draft"
  paper.amountRaised = BigInt.fromI32(0)
  // citedBy: [Paper!]
  // paper.setcitationsUsed(citations);
  // paper
  paper.save()
  let citationsCount = 0
  event.params.citationsUsed.forEach(c => {
    // console.log(c);
    let citedPaper = Paper.load(c.toHex())
    citedPaper.citedBy.push(event.params.id.toHex())
    citedPaper.save()
  })
  let paperScholar = Scholar.load(event.params.author.toHex())
  if (paperScholar == null) {
    let scholar = new Scholar(event.params.author.toHex())
    scholar.publications.push(paper.id)
    scholar.hIndex = citationsCount
    scholar.save()
  } else {
    paperScholar.publications.push(paper.id)
    // paperScholar.hIndex += citationsCount
    paperScholar.save()
  }
}

export function handleReviewAdded(event: ReviewAdded): void {}

export function handleTransfer(event: Transfer): void {}

export function handleValidated(event: Validated): void {}

export function handleValidationRequestSent(
  event: ValidationRequestSent
): void {}

export function handleValidatorConfirmed(event: ValidatorConfirmed): void {}

export function handleValidatorResponseSent(
  event: ValidatorResponseSent
): void {}

export function handleScholarVerified(event: ScholarVerified): void {
  let paperScholar = Scholar.load(event.params._addr.toHex())
  if (paperScholar == null) {
    let scholar = new Scholar(event.params._addr.toHex())
    scholar.name = event.params._name
    scholar.fields = event.params._fields
    scholar.subFields = event.params._subFields
    scholar.verified = true
    // scholar.publications = event.params.
    scholar.hIndex
    scholar.save()
  }
}

export function handleValidatorVerified(event: ValidatorVerified): void {

}