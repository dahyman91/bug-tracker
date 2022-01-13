class Api::MembershipsController < ApplicationController

  def create
    membership = Membership.create!(membership_params)
    render json: membership, status: :created
  end

  def index
    render json: Membership.all
  end

  private

  def membership_params
    params.permit(:user_id, :team_id, :is_admin?)
  end
end
