class Api::MembershipsController < ApplicationController

  def create
    membership = Membership.create!(membership_params)
    render json: membership, status: :created
  end

  def index
    render json: Membership.all
  end

  def show
    user = User.find(session[:user_id])
    membership = user.memberships.find_by(team_id: params[:id])
    render json: membership
  end

  private

  def membership_params
    params.permit(:user_id, :team_id, :is_admin?)
  end
end
