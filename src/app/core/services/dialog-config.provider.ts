import {FleetApplicationDialogConfig} from '@@fleets/dialogs/fleet-application/fleet-application-dialog-config';
import {Memoize} from '@@shared/decorators/memoizee.decorator';
import {ConfirmationModalConfig} from '@@shared/models/confirmation-modal-config';
import {InformationDialogConfig} from '@@shared/models/information-dialog-config';
import {FleetSegment} from '@@shared/models/fleet-segment';
import {Clause} from '@@fleets/models/clause';

export class DialogConfigProvider {

  @Memoize()
  static removeFleetCard(fleetNumber: string, segment: FleetSegment): ConfirmationModalConfig {
    if (FleetSegment.SMALL_FLEET === segment) {
      return DialogConfigProvider.smallFleetRemove();
    } else if (FleetSegment.FLEET === segment) {
      return DialogConfigProvider.fleetRemove();
    }
  }

  @Memoize()
  static copyFleetCard(segment: FleetSegment): ConfirmationModalConfig {
    if (FleetSegment.SMALL_FLEET === segment) {
      return DialogConfigProvider.smallFleetCopy();
    } else if (FleetSegment.FLEET === segment) {
      return DialogConfigProvider.fleetCopy();
    }
  }

  @Memoize()
  static vehicleRemove(vinNumber: string): ConfirmationModalConfig {
    return {
      title: 'vehicle_removing',
      messageKeyOrText: 'confirm_vehicle_removing',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no',
      translateParams: {vinNumber}
    };
  }

  @Memoize()
  static variantRemove(): ConfirmationModalConfig {
    return {
      title: 'variant_removing',
      messageKeyOrText: 'confirm_variant_removing',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no'
    };
  }

  @Memoize()
  static cancelApplication(): ConfirmationModalConfig {
    return {
      title: 'cancel_application_dialog.title',
      messageKeyOrText: 'cancel_application_dialog.text',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no'
    };
  }

  @Memoize()
  static fleetAccept(): ConfirmationModalConfig {
    return {
      title: 'fleet_accept_title',
      messageKeyOrText: 'fleet_accepted_message',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no'
    };
  }

  @Memoize()
  static fleetRemove(): ConfirmationModalConfig {
    return {
      title: 'fleet_delete_title',
      messageKeyOrText: 'fleet_delete_warning'
    };
  }

  @Memoize()
  static smallFleetRemove(): ConfirmationModalConfig {
    return {
      title: 'small_fleet_delete_title',
      messageKeyOrText: 'small_fleet_delete_warning'
    };
  }

  @Memoize()
  static afterFleetAccept(): ConfirmationModalConfig {
    return {
      title: 'fleet_accepted_title',
      messageKeyOrText: 'fleet_accepted',
      confirmBtnKey: 'view360_fleet',
      cancelBtnKey: 'view360_fleet_search'
    };
  }

  @Memoize()
  static acceptApplication(applicationNumber: string): FleetApplicationDialogConfig {
    return {
      title: 'application_action_dialog.accept_title',
      confirmBtnKey: 'application_action_dialog.accept_and_get_next_application_btn',
      cancelBtnKey: 'application_action_dialog.accept_and_go_to_uw_list_btn',
      translateParams: {applicationNumber}
    };
  }

  @Memoize()
  static acceptWithChangesApplication(applicationNumber: string): FleetApplicationDialogConfig {
    return {
      title: 'application_action_dialog.accept_with_changes_title',
      confirmBtnKey: 'application_action_dialog.accept_and_get_next_application_btn',
      cancelBtnKey: 'application_action_dialog.accept_and_go_to_uw_list_btn',
      translateParams: {applicationNumber}
    };
  }

  @Memoize()
  static rejectApplication(): FleetApplicationDialogConfig {
    return {
      title: 'reject_application.title',
      confirmBtnKey: 'reject_application.reject_and_get_next_application_btn',
      cancelBtnKey: 'reject_application.reject_and_go_to_uw_list_btn'
    };
  }

  @Memoize()
  static rejectCalculationByClient(): ConfirmationModalConfig {
    return {
      title: 'reject_calculation_by_client_dialog.title',
      messageKeyOrText: 'reject_calculation_by_client_dialog.text',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no',
    };
  }

  @Memoize()
  static cancelInquiry(): ConfirmationModalConfig {
    return {
      title: 'cancel_inquiry_dialog.title',
      messageKeyOrText: 'cancel_inquiry_dialog.text',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no',
    };
  }

  @Memoize()
  static returnApplicationToAgentToGetMoreInfo(applicationNumber: string): FleetApplicationDialogConfig {
    return {
      title: 'application_action_dialog.ask_for_more_application_details_title',
      confirmBtnKey: 'application_action_dialog.send_and_get_next_application_btn',
      cancelBtnKey: 'application_action_dialog.send_and_go_to_uw_list_btn',
      translateParams: {applicationNumber}
    };
  }

  @Memoize()
  static fleetCopy(): ConfirmationModalConfig {
    return {
      title: 'fleet_copy_title',
      messageKeyOrText: 'fleet_copy_title',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no'
    };
  }

  @Memoize()
  static smallFleetCopy(): ConfirmationModalConfig {
    return {
      title: 'small_fleet_copy_title',
      messageKeyOrText: 'small_fleet_copy_title',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no'
    };
  }

  @Memoize()
  static deleteTariffGroup(tariffGroupName: string): ConfirmationModalConfig {
    return {
      title: 'delete_tariff_group_dialog_title',
      messageKeyOrText: 'delete_tariff_group_dialog_text',
      translateParams: {tariffGroupName: tariffGroupName || ''},
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no'
    };
  }

  @Memoize()
  static notOwnPolicyViewInfo(policyNumber: string) {
    return {
      title: policyNumber,
      messageKeyOrText: 'policy_listing.not_own_policy_modal_content',
      okBtnKey: 'policy_listing.not_own_policy_modal_close_btn'
    };
  }

  @Memoize()
  static fleetForRegonExists(): ConfirmationModalConfig {
    return {
      title: 'fleet_exists_for_regon',
      messageKeyOrText: 'fleet_exists_for_regon_message',
      confirmBtnKey: 'pull_data',
      cancelBtnKey: 'fleet_view'
    };
  }

  @Memoize()
  static generalAgreementFroRegonExists(): InformationDialogConfig {
    return {
      title: 'general_agreement_exists',
      messageKeyOrText: 'general_agreement_exists',
      okBtnKey: 'general_agreement_view'
    };
  }

  @Memoize()
  static offerForRegonExists(): InformationDialogConfig {
    return {
      title: 'offer_exists',
      messageKeyOrText: 'offer_exists',
      okBtnKey: 'go_to_edit_offer_page'
    };
  }

  @Memoize()
  static createOfferForExistsRegon({createdByCurrentUser}): ConfirmationModalConfig {
    const messageKeyOrText = createdByCurrentUser
      ? 'offer_exists_with_creation_option'
      : 'offer_exists_with_uw_acceptance_requiring';
    return {
      title: 'offer_exists',
      messageKeyOrText,
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no'
    };
  }

  @Memoize()
  static draftForRegonExists(): InformationDialogConfig {
    return {
      title: 'draft_exists',
      messageKeyOrText: 'draft_exists',
      okBtnKey: 'go_to_edit_draft_page'
    };
  }

  @Memoize()
  static overwriteAmbiguousVehicles(): ConfirmationModalConfig {
    return {
      title: 'error_occurred',
      messageKeyOrText: 'ambiguous_vehicles_found_message',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no'
    };
  }

  @Memoize()
  static remitOffer(): ConfirmationModalConfig {
    return {
      title: 'remit_offer_dialog.title',
      messageKeyOrText: 'remit_offer_dialog.text',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no'
    };
  }

  @Memoize()
  static deleteGeneralAgreementClause(clause: Clause): ConfirmationModalConfig {
    return {
      title: 'delete_general_agreement_clause.title',
      messageKeyOrText: 'delete_general_agreement_clause.text',
      confirmBtnKey: 'yes',
      cancelBtnKey: 'no',
      translateParams: {clauseName: clause.name}
    };
  }
}
