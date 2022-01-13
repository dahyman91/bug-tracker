class AddIsAdminToMemberships < ActiveRecord::Migration[6.1]
  def change
    add_column :memberships, :is_admin?, :boolean
  end
end
