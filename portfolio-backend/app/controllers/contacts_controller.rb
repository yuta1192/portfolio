class ContactsController < ApplicationController
  def create
    contact = Contact.new(name: params[:name], email: params[:email], message: params[:message])
    if contact.save!
      render json: nil, status: :ok
    else
      render json: contact.errors, status: :unprocessable_entity
    end
  end
end
