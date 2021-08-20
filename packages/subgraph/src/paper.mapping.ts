import { BigInt, Bytes, Value, Address, log } from "@graphprotocol/graph-ts"
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
  let paper = new Paper(event.params.id.toString())
  paper.id = event.params.id.toString()
  paper.owner = event.transaction.from
  paper.author = event.transaction.from.toHex()
  paper.references = event.params.references
  paper.validatorTip = event.transaction.value
  paper.fields = event.params.fields
  paper.deadline = event.block.timestamp.plus(BigInt.fromI32(5760*7*6))
  paper.stage = "Draft"
  paper.amountRaised = BigInt.fromI32(0)
  paper.citedBy = []
  paper.save()

  let ecu: Array<BigInt> = event.params.references
  for (let i = 0; i < ecu.length; i++) {
    let c:BigInt = ecu[i];
    let citedPaper = Paper.load(c.toString())
    if (citedPaper == null) {
      citedPaper = new Paper(c.toString())
      citedPaper.owner = Address.fromString("0x0000000000000000000000000000000000000000")
      citedPaper.author = "0x0000000000000000000000000000000000000000"
      citedPaper.references = []
      citedPaper.validatorTip = BigInt.fromI32(0)
      citedPaper.fields = []
      citedPaper.deadline = event.block.timestamp.plus(BigInt.fromI32(5760*7*6))
      citedPaper.stage = "Draft"
      citedPaper.amountRaised = BigInt.fromI32(0)
      citedPaper.citedBy = [event.params.id]
      citedPaper.save()
    } else {
      citedPaper.id = c.toString()
      let cpcb:Array<BigInt> = citedPaper.citedBy
      cpcb.push(event.params.id)
      citedPaper.citedBy = cpcb
      citedPaper.save()
      // log.info("cpauthor {}", [citedPaper.author])

      let cpauthor = Scholar.load(citedPaper.author)
      if (cpauthor != null) {
        let cpauthorPubs:Array<string> = cpauthor.publications as Array<string>
        let maxcit: number = 0
        let maxhindex: number = cpauthorPubs.length
        let hindex: number = 0
        // log.debug("cpauthorPubsl = {}", [BigInt.fromI32(cpauthorPubs.length).toString()])
        let arr:Array<number> = []
        for (let j = 0; j < cpauthorPubs.length; j++) {
          // log.debug("cpauthorPubs[j] = {}", [<string>cpauthorPubs[j]])
          let cpauthorPubId:string = cpauthorPubs[j];
            let cpauthorPub = Paper.load(cpauthorPubId)
            if (cpauthorPub != null) {
              arr.push(cpauthorPub.citedBy.length)
              // maxcit = cpauthorPub.citedBy.length
              // if (maxcit <= maxhindex) {
              //   hindex = maxcit
              // }
            }
        }
        arr.sort()
        for (let k = 0; k < arr.length; k++) {
          let cited = arr[k];
          let result = arr.length - k
          if (result <= cited) {
            hindex = result
            break
          }
        }
        cpauthor.hIndex = <i32>hindex
        cpauthor.save()
      }
      // citedPaper.save()
    }
  }

  let paperScholar = Scholar.load(event.transaction.from.toHex())
  // log.info("paperScholar {}", [paperScholar.id])
  if (paperScholar == null) {
    let scholar = new Scholar(event.transaction.from.toHex())
    scholar.verified = true
    scholar.publications = [event.params.id.toString()]
    scholar.hIndex = 0
    scholar.save()
  } else {
    // log.info("paperScholar CASE 2 {}", ["hmm"])

    let psps:Array<string> = paperScholar.publications
    psps.push(event.params.id.toString())
    paperScholar.publications = psps

    // paperScholar.publications.push(event.params.id.toString())
    // paperScholar.hIndex = paperScholar.publications.length
    paperScholar.save()
    // let pubs: Array<string> = paperScholar.publications
    // for (let i = 0; i < pubs.length; i++) {
    //   const pub = pubs[i];
    //   let schPub = Paper.load(pub)
    //   let maxcit: number = 0
    //   let maxhindex: number = 0
    //   if (schPub != null) {
    //     let ccount: number = schPub.citedBy.length
    //   }
    // }
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
    scholar.publications = []
    scholar.save()
  }
}

export function handleValidatorVerified(event: ValidatorVerified): void {

}