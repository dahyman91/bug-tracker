class Api::TicketsController < ApplicationController
  skip_before_action :authorize, only: %i[show index create destroy]

  def index
    render json: Ticket.all
  end

  def show
    ticket = Ticket.find(params[:id])
    render json: ticket, status: :ok
  end

  def create
    ticket = Ticket.create!(ticket_params)
    render json: ticket, status: :created
  end

  def destroy
    ticket = Ticket.find_by(id: params[:id])
    ticket.destroy
    head :no_content
  end
  private

  def ticket_params
    params.permit(:assignee_id, :submitter_id, :project_id, :priority, :type, :status, :title, :description, :files, :category)
  end
end
